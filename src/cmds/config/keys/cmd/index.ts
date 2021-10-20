/*
 *  Reads all configuration keys and outputs them in different formats.
 *  Created On 19 October 2021
 */

import { Command, Option } from 'commander'
import { keys } from '../lib/index.js';

export default new Command()
    .name('keys')
    .description('reads all config keys & outputs')
    .addOption(new Option('-f, --format <fmt>', 'format to output in').default('string'))
    .action(async ({format}) => {
        if (format != 'string') throw new Error('not implemented yet')

        const all = await keys()
        console.log(
            all.join(
                '\n'
            )
        )
    })