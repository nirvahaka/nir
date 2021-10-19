/*
 *  Writes a config entry within the database.
 *  Created On 18 October 2021
 */

import { Command } from 'commander'
import { set } from '../lib/index.js';

export default new Command()
    .name('set')
    .description('writes a config entry within the database')
    .argument('<key>', 'which config to change')
    .argument('<value>', 'the value to set the config to')
    .action(async (key, value) => {
        await set(key, value)
    })