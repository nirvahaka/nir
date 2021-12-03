/*
 *  Configures commander.js and initializes commands.
 *  Created On 18 October 2021
 */

import { Command } from 'commander'
import dirname from 'es-dirname'
import fs from 'fs/promises'
import path from 'path'

import config from './config/index.js'
import volumes from './volumes/index.js'

const program = new Command()

export default async () => {
    const { name, version } = JSON.parse(
        await fs.readFile(
            path.join(dirname(), '..', '..', 'package.json'),
            'utf-8',
        ),
    )

    program.name(name).version(version).addCommand(config).addCommand(volumes)

    return await program.parseAsync()
}
