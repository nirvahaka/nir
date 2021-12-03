/*
 *  A function that checks if there is a valid active volume.
 *  Created On 03 December 2021
 */

import { get } from '../../cmds/config/get/lib/index.js';
import { logger } from '../../logger/index.js';
import chalk from 'chalk';

export default async () => {
    const activeVolume = await get('volumes.active')
    if (Boolean(activeVolume) == true) return

    // show that an active volume has not been set
    logger.error('An active volume has not been set please set one\n   before using this command\n')
    logger.info(`Use the following command :point_down: to set an active volume\n\n   ${chalk.whiteBright.bold('nir config set volumes.active')} ${chalk.gray('<volume_name>')}`)

    // halt execution here
    process.exit(1)
}
