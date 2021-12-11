/*
 *  Dynamically renders a description for selected videos.
 *  Created On 11 December 2021
 */

import { Command } from 'commander'
import yaml from 'js-yaml'

import { get } from '~cmds/config/get/lib/index.js'
import interactiveSelectVideos from '~util/interactiveSelectVideos/index.js'

import describe from '../lib/index.js'

const action = async (query, { multiple, reflect }) => {
    // interactively ask the user
    // which video(s) he/she/they wants to operate on
    const videos = await interactiveSelectVideos({
        multiple: Boolean(multiple),
        search: query.join(' ').trim(),
    })

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
