/*
 *  Handles volumes where resources are stored.
 *  Created On 24 October 2021
 */
import { Command } from 'commander';
import add from './add/cmd/index.js';
import status from './status/cmd/index.js';
import open from './open/cmd/index.js';
export default new Command()
    .name('volumes')
    .description('outputs status info of one or more volumes')
    .option('--no-pretty', 'print a pretty table instead of JSON', true)
    .action(status)
    .addCommand(add)
    .addCommand(open);
