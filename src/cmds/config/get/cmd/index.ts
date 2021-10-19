/*
 *  Reads a given config entry and outputs the value.
 *  Created On 19 October 2021
 */

import { Command } from 'commander'
import { get } from '../lib/index.js';

export default new Command()
    .name('get')
    .description('reads a config entry from the database')
    .argument('<key>', 'the key to read from')
    .action(async (key) => {
        const value = await get(key)
        console.log(value)
    })