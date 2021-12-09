/*
 *  Open selected video with the default file manager.
 *  Created On 08 December 2021
 */
import { Command } from 'commander';
import open from 'open';
import path from 'path';
import { getPlatformPathString } from '~cmds/volumes/add/lib/index.js';
import interactiveSelectVideos from '~util/interactiveSelectVideos/index.js';
const action = async (query, { multiple }) => {
    // interactively ask the user
    // which video(s) he/she/they wants to open
    const videos = await interactiveSelectVideos({
        multiple: Boolean(multiple),
        search: query.join(' ').trim(),
    });
    // get the current volume key
    const key = getPlatformPathString();
    // open the path in default file manager
    for (const video of videos) {
        const videoPath = path.join(video['volume'][key], 'Workarea', 'Video', video.slug);
        open(videoPath, {
            wait: false,
        });
    }
};
export default new Command()
    .name('open')
    .description('open selected video with the default file manager')
    .action(action)
    .argument('[queries...]')
    .option('--multiple', 'open multiple selected videos');
