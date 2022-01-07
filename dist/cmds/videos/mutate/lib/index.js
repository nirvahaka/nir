/*
 *  Takes multiple videos and let's you edit their metadata on database.
 *  Created On 12 December 2021
 */
import { diff } from 'deep-object-diff';
import dirname from 'es-dirname';
import glob from 'glob';
import yaml from 'js-yaml';
import path from 'path';
import readFileInput from 'read-file-input';
import { get } from '~cmds/config/get/lib/index.js';
import { db } from '~database/index.js';
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
        'synced',
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
        // reflect on the changes accordingly
        const files = glob.sync(path.join(dirname(), 'handlers', '*.js'));
        const handlers = {};
        // populate all handler files
        for (const file of files) {
            const { default: handler } = await import('file://' + file);
            handlers[path.parse(file).name] = handler;
        }
        // mark that video as out of sync if any values were changed
        if (Object.keys(changes).length > 0)
            await db.video.update({
                where: {
                    slug: src.slug,
                },
                data: {
                    synced: false,
                },
            });
        for (const key in changes) {
            const handler = handlers[key];
            // todo: throw a warning when there is no handler
            // because they're not supposed to edit that field
            // execute the handler
            await handler(changes, edited, src);
        }
    }
};
