/*
 *  Open a volume's platform specific path in the default file manager
 *  by taking a volume name.
 *  Created On 02 December 2021
 */

import { Command } from 'commander';
import { db } from '../../../../database/index.js';
import { getPlatformPathString } from '../../add/lib/index.js';
import open from 'open';
import { logger } from '../../../../logger/index.js';
import chalk from 'chalk';

const action = async (name) => {
    // get the volume
    const volume = await db.volume.findFirst({
        where: {
            name,
        }
    })

    // todo: handle if no volume was found

    const key = getPlatformPathString()
    await open(volume[key])

    logger.success(`Opened ${chalk.gray(volume[key])}`)
}

export default new Command()
    .name('open')
    .description('open a volume in default file manager')
    .argument('<name>', 'unique name of the volume')
    .action(action)

