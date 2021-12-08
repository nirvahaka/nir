/*
 *  Handles configuration of the CLI.
 *  Created On 18 October 2021
 */

import { Command, Option } from 'commander'

import { action } from './_root/cmd/index.js'
import get from './get/cmd/index.js'
import set from './set/cmd/index.js'

export default new Command()
    .name('config')
    .description('reads all config keys & outputs')
    .addOption(
        new Option('-f, --format <fmt>', 'format to output in').default(
            'string',
        ),
    )
    .action(action)
    .addCommand(set)
    .addCommand(get)
    .allowExcessArguments(false)
    .allowUnknownOption(false)
