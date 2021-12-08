/*
 *  Create a new video in the active volume.
 *  Created On 03 December 2021
 */
import { Command } from 'commander';
import yaml from 'js-yaml';
import readFileInput from 'read-file-input';
import slug from 'slug';
import { get } from '~cmds/config/get/lib/index.js';
import { db } from '~database/index.js';
import hasActiveVolume from '~util/activeVolume/index.js';
import createVideo from '../lib/index.js';
const action = async () => {
    // check if there is an active volume
    await hasActiveVolume();
    // get current volume's information
    const volume = await db.volume.findFirst({
        where: {
            name: await get('volumes.active'),
        },
    });
    // todo: handle if active volume not found in database
    // read the user input
    const data = await readFileInput({
        name: 'nir.video.add.[id].yml',
        editor: await get('editor'),
        content: {
            data: 'videos:\n    # the video title surrounded by double quotes\n    "The video title":\n        # the type of the resource, accepted values are "Video" & "Stream"\n        type: Video',
        },
    });
    // parse the input data
    const { videos } = yaml.load(data);
    // loop through each video and create it
    for (const title in videos) {
        const video = videos[title];
        video['title'] = title;
        video['slug'] = slug(title);
        await createVideo(video, volume);
    }
};
export default new Command()
    .name('add')
    .description('creates a new video resource')
    .action(action)
    .allowExcessArguments(false)
    .allowUnknownOption(false);
