/*
 *  Creates or registers a new volume in the database.
 *  Created On 24 October 2021
 */

import { Command } from 'commander'

import { logger } from '../../../../logger/index.js'
import { set } from '../../../config/set/lib/index.js'
import addNewVolume from '../lib/index.js'

const action = async (name, dir, { mode, force, setActive }) => {
    // add the volume
    await addNewVolume({
        name,
        dir,
        initialize: mode == 'init',
        force: Boolean(force),
    })

    // mark the volume active if required
    if (setActive) await set('volumes.active', name)

    // notify the user that the volume has been
    // created and optionally marked as active
    logger.success(`Added a new volume named ${name}`)
    if (setActive) logger.info('Volume has been marked active')
    logger.info('Volume will be assessable from next invocation')
}

export default new Command()
    .name('add')
    .description('creates or registers a new volume')
    .argument('<name>', 'unique name of the volume')
    .argument('<path>', 'path of the directory on this OS platform')
    .option(
        '--mode <init|link>',
        'whether to create directory structure',
        'link',
    )
    .option('--force', 'allow initializing on non-empty directory', false)
    .option('--set-active', 'mark the newly created volume as active', false)
    .action(action)
