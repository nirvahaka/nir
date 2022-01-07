/*
 *  Takes multiple videos and let's you edit their metadata on database.
 *  Created On 12 December 2021
 */

import { diff } from 'deep-object-diff'
import dirname from 'es-dirname'
import glob from 'glob'
import yaml from 'js-yaml'
import path from 'path'
import readFileInput from 'read-file-input'

import { get } from '~cmds/config/get/lib/index.js'

export default async (videos: any[]) => {
    // remove fields that are not allowed to be edited
    // directly like that
    const remove = [
        'volume',
        'volumeName',
        'created',
        'published',
        'archived',
        'status',
    ]
    for (const video of videos) {
        for (const key of remove) delete video[key]

        // parse description
        video.description = JSON.parse(video.description || '{}')
    }

    // create yaml
    let content = {
        videos,
    } as any

    content = yaml
        .dump(content, {
            indent: 4,
        })
        .replaceAll('\n    -', '\n\n    -')

    // open the editor
    const input = await readFileInput({
        editor: await get('editor'),
        name: 'nir.videos.mutate.[id].yml',
        content: {
            data: content,
        },
    })

    // parse yaml
    // todo: handle when user messed up with YAML
    const { videos: inputParsed } = yaml.load(input) as any

    // loop through each video
    for (const edited of inputParsed) {
        const src = videos.find(video => video.slug == edited.slug)
        // todo: handle when slug doesn't match with existing

        // get diff
        const changes = diff(src, edited)

        // reflect on the changes accordingly
        const files = glob.sync(path.join(dirname(), 'handlers', '*.js'))
        const handlers = {}

        // populate all handler files
        for (const file of files) {
            const { default: handler } = await import('file://' + file)
            handlers[path.parse(file).name] = handler
        }

        for (const key in changes) {
            const handler = handlers[key]

            // todo: throw a warning when there is no handler
            // because they're not supposed to edit that field

            // execute the handler
            await handler(changes, edited, src)
        }
    }
}