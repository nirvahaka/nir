/*
 *  Creates or registers a new volume in the database.
 *  Created On 24 October 2021
 */
import { Command } from 'commander';
import addNewVolume from '../lib/index.js';
import { logger } from '../../../../logger/index.js';
export default new Command()
    .name('add')
    .description('creates or registers a new volume in the database')
    .argument('<name>', 'unique name of the volume')
    .argument('<path>', 'path of the directory on this OS platform')
    .option('--mode <init|link>', 'whether to create directory structure', 'link')
    .option('--force', 'allow initializing on non-empty directory', false)
    .action(async (name, dir, opts) => {
    await addNewVolume({
        name,
        dir,
        initialize: opts.mode == 'init',
        force: Boolean(opts.force)
    });
    logger.success(`Added a new volume named ${name}`);
    logger.info('Volume will be assessable from next invocation');
});
