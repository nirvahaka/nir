/*
 *  Creates close captions file for selected videos.
 *  Created On 10 December 2021
 */

import { Command } from 'commander'

import { getPlatformPathString } from '~cmds/volumes/add/lib'
import interactiveSelectVideos from '~util/interactiveSelectVideos/index.js'

import createCaptions from '../lib/index.js'

const action = async (query, { multiple }) => {
    // interactively ask the user
    // which video(s) he/she/they wants to operate on
    const videos = await interactiveSelectVideos({
        multiple: Boolean(multiple),
        search: query.join(' ').trim(),
    })

    // get the current volume key
    const key = getPlatformPathString()

    // loop through each selected video and generate
    // close captions
    for (const video of videos) await createCaptions({ key, video })
}

export default new Command()
    .name('caption')
    .description('creates close captions file for selected videos')
    .action(action)
    .argument('[queries...]')
    .option('--multiple', 'create captions for multiple selected videos')
