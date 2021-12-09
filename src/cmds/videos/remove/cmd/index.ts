/*
 *  Removes a video resource who's status is still "active".
 *  Created On 10 December 2021
 */

import { promise } from '@vsnthdev/utilities-node'
import { Command } from 'commander'

import removeVideo from '../lib/index.js'

const action = async slug => {
    const { err } = await promise.handle(removeVideo(slug))

    // todo: handle error using itivrutaha
    if (err) throw err
}

export default new Command()
    .name('remove')
    .description('deletes a given video from both database & filesystem')
    .action(action)
    .argument('slug')
    .allowExcessArguments(false)
    .allowUnknownOption(false)
