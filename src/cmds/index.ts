/*
 *  Configures commander.js and initializes commands.
 *  Created On 18 October 2021
 */

import { Command } from 'commander'
import fs from 'fs/promises';
import path from 'path' ;
import dirname from 'es-dirname';

import config from './config/index.js';

const program = new Command()

export default async () => {
    const { version } = JSON.parse(await fs.readFile(path.join(dirname(), '..', '..', 'package.json'), 'utf-8'))

    program.name('nirvahaka').version(version).addCommand(config)

    return await program.parseAsync()
}