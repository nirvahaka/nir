/*
 *  Writes a config entry within the database.
 *  Created On 18 October 2021
 */
import utilities from '@vsnthdev/utilities-node';
import { Command } from 'commander';
import dirname from 'es-dirname';
import fs from 'fs/promises';
import path from 'path';
import { logger } from '~logger/index.js';
import { set } from '../lib/index.js';
const setDatabaseURL = async (url) => {
    // calculate the path of .env file
    const envPath = path.join(dirname(), '..', '..', '..', '..', '..', '.env');
    // read it or initialize it with an empty string
    let envStr = (await utilities.fs.exists(envPath))
        ? await fs.readFile(envPath, 'utf-8')
        : '';
    // figure out if there's an existing value set
    const existingLine = envStr
        .split('\n')
        .filter(Boolean)
        .find(line => line.startsWith('DATABASE_URL='));
    // do the modification accordingly
    if (existingLine) {
        envStr = envStr.replaceAll(existingLine, `DATABASE_URL=${url}`);
    }
    else {
        envStr = envStr + `\nDATABASE_URL=${url}`;
    }
    // write the updated file
    await fs.writeFile(envPath, envStr.trim());
    // log the message
    logger.success('Successfully set the database URL');
    logger.info('Changes will take effect from next invocation');
};
export default new Command()
    .name('set')
    .description('writes a config entry within the database')
    .argument('<key>', 'which config to change')
    .argument('<value>', 'the value to set the config to')
    .action(async (key, value) => {
    if (key == 'database')
        return await setDatabaseURL(value);
    await set(key, value);
});
