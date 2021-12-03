/*
 *  Handles volumes where resources are stored.
 *  Created On 24 October 2021
 */

import { Command } from 'commander'

import root from './_root/cmd/index.js'
import add from './add/cmd/index.js'
import open from './open/cmd/index.js'
import remove from './remove/cmd/index.js'

export default new Command()
    .name('volumes')
    .description('outputs status info of one or more volumes')
    .option('--no-pretty', 'print a pretty table instead of JSON', true)
    .action(root)
    .addCommand(add)
    .addCommand(open)
    .addCommand(remove)
