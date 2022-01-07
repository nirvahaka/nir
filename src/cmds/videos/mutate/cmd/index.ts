/*
 *  Allows to modify the selected videos and updates the database
 *  and published video accordingly.
 *  Created On 11 December 2021
 */

import { Command } from 'commander'

import interactiveSelectVideos from '~util/interactiveSelectVideos/index.js'

import mutateVideos from '../lib/index.js'

const action = async (query, { multiple }) => {
    // interactively ask the user
    // which video(s) he/she/they wants to operate on
    await mutateVideos(
        await interactiveSelectVideos({
            multiple: Boolean(multiple),
            search: query.join(' ').trim(),
        }),
    )
}

export default new Command()
    .name('mutate')
    .description('modify metadata for selected videos')
    .action(action)
    .argument('[queries...]')
    .option('--multiple', 'modify multiple videos at once')
