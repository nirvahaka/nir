/*
 *  Dynamically renders a description for selected videos.
 *  Created On 11 December 2021
 */

import { Command } from 'commander'
import yaml from 'js-yaml'

import { get } from '~cmds/config/get/lib/index.js'
import { logger } from '~logger/index.js'
import interactiveSelectVideos from '~util/interactiveSelectVideos/index.js'

import describe from '../lib/index.js'

const action = async (query, { multiple, reflect }) => {
    // interactively ask the user
    // which video(s) he/she/they wants to operate on
    let videos = await interactiveSelectVideos({
        multiple: Boolean(multiple),
        search: query.join(' ').trim(),
    })

    // check if there are any videos which are unpublished
    const unpublished = videos.filter(video => video.status != 'published')

    // handle when the user selects reflect & there's
    // an unpublished video on this list
    if (reflect && unpublished.length > 0) {
        if (videos.length == 2) {
            logger.error(
                `Cannot reflect description for this unpublished video`,
                2,
            )
        } else {
            logger.warning(`The following unpublished videos will be ignored`)
            console.log(unpublished.map(video => video.title).join('\n'))

            videos = videos.filter(video => video.status == 'published')
        }
    }

    // get both the description template & data
    const template = ((await get('description.template')) || '') as string
    const data = yaml.load(await get('description')) || {}

    // loop through each video and generate the description
    for (const video of videos)
        await describe({ data, template, video, reflect })
}

export default new Command()
    .name('describe')
    .description('creates description for selected videos')
    .action(action)
    .argument('[queries...]')
    .option('--multiple', 'create description for multiple videos')
    .option('--reflect', 'update the changes on the published video')
