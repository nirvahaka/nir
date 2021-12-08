/*
 *  Hosts all commands related to video management.
 *  Created On 03 December 2021
 */
import { Command } from 'commander';
import add from './add/cmd/index.js';
export default new Command()
    .name('videos')
    .description('prints a table of recently created videos')
    .option('--no-pretty', 'print a pretty table instead of JSON', true)
    .addCommand(add)
    .allowExcessArguments(false)
    .allowUnknownOption(false);
