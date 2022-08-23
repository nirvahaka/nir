/*
 *  Configures commander.js and initializes commands.
 *  Created On 18 October 2021
 */
import { Command } from 'commander';
import dirname from 'es-dirname';
import fs from 'fs/promises';
import path from 'path';
import rupa from 'rupa';
import config from './config/index.js';
import login from './login/index.js';
import videos from './videos/index.js';
import volumes from './volumes/index.js';
const program = new Command();
export default async () => {
    const { name, version, description } = JSON.parse(await fs.readFile(path.join(dirname(), '..', '..', 'package.json'), 'utf-8'));
    program
        .name(name)
        .version(version)
        .description(description.split('-')[1].trim())
        .allowExcessArguments(false)
        .allowUnknownOption(false)
        .addCommand(login)
        .addCommand(config)
        .addCommand(volumes)
        .addCommand(videos);
    rupa(program);
    return await program.parseAsync();
};
