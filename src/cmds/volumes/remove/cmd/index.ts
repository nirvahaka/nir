/*
 *  Deletes a volume from both filesystem and database.
 *  Created On 03 December 2021
 */

import { Command } from 'commander'
import rimraf from 'rimraf'

import { db } from '../../../../database/index.js'
import { logger } from '../../../../logger/index.js'
import { get } from '../../../config/get/lib/index.js'
import { set } from '../../../config/set/lib/index.js'
import { getPlatformPathString } from '../../add/lib/index.js'

const action = async name => {
    const isActive = (await get('volumes.active')) == name
    const key = getPlatformPathString()

    // get the volume path
    const volume = await db.volume.findFirst({
        where: {
            name,
        },
    })

    // todo: handle when no volume is found
    // delete from the filesystem
    rimraf.sync(volume[key])

    // delete from the database
    await db.volume.delete({
        where: {
            name,
        },
    })

    // optionally, remove the volumes.active config
    // if this is the active volume
    if (isActive) await set('volumes.active')

    logger.success(`Removed ${name} volume along with it's content`)
    if (isActive) logger.warning('Active volume has been removed')
    logger.info('Volume will be inaccessible from next invocation')
}

export default new Command()
    .name('remove')
    .description("deletes a given volume including it's content")
    .argument('<name>', 'unique name of the volume')
    .action(action)
