/*
 *  Handles configuration of the CLI.
 *  Created On 18 October 2021
 */
import { Command } from 'commander';
import set from './set/cmd/index.js';
export default new Command()
    .name('config')
    .description('Handles configuration of the CLI.')
    .addCommand(set);
