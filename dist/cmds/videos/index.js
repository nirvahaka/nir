/*
 *  Hosts all commands related to video management.
 *  Created On 03 December 2021
 */
import { Command } from 'commander';
import add from './add/cmd/index.js';
import caption from './caption/cmd/index.js';
import open from './open/cmd/index.js';
import remove from './remove/cmd/index.js';
export default new Command()
    .name('videos')
    .description('prints a table of recently created videos')
    .option('--no-pretty', 'print a pretty table instead of JSON', true)
    .addCommand(add)
    .addCommand(open)
    .addCommand(remove)
    .addCommand(caption)
    .allowExcessArguments(false)
    .allowUnknownOption(false);
