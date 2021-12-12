/*
 *  Takes multiple videos and let's you edit their metadata on database.
 *  Created On 12 December 2021
 */
import { diff } from 'deep-object-diff';
import yaml from 'js-yaml';
import readFileInput from 'read-file-input';
import { get } from '~cmds/config/get/lib/index.js';
export default async (videos) => {
    // remove fields that are not allowed to be edited
    // directly like that
    const remove = [
        'volume',
        'volumeName',
        'created',
        'published',
        'archived',
        'status',
    ];
    for (const video of videos) {
        for (const key of remove)
            delete video[key];
        // parse description
        video.description = JSON.parse(video.description || '{}');
    }
    // create yaml
    let content = {
        videos,
    };
    content = yaml
        .dump(content, {
        indent: 4,
    })
        .replaceAll('\n    -', '\n\n    -');
    // open the editor
    const input = await readFileInput({
        editor: await get('editor'),
        name: 'nir.videos.mutate.[id].yml',
        content: {
            data: content,
        },
    });
    // parse yaml
    // todo: handle when user messed up with YAML
    const { videos: inputParsed } = yaml.load(input);
    // loop through each video
    for (const edited of inputParsed) {
        const src = videos.find(video => video.slug == edited.slug);
        // todo: handle when slug doesn't match with existing
        // get diff
        const changes = diff(src, edited);
        console.log(changes);
        // todo: reflect on the changes!
    }
};
