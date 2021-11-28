/*
 *  Links a new volume to the database by optionally initializing it.
 *  Created On 24 October 2021
 */

import os from 'os';
import path from 'path';
import { db } from '../../../../database/index.js';
import fs from 'fs/promises';
import { create } from 'vyuha';
import { structure } from './filesystem.js';

interface AddVolumeImpl {
    name: string
    dir: string
    initialize: boolean
    force?: boolean
}

const addVolumeToDatabase = async (name: string, dir: string) => {
    const platform = os.platform().replace(/[0-9]/g, '')
    const key = `${platform}Path`

    await db.volume.upsert({
        create: {
            name,
            [key]: dir
        },
        where: {
            name,
        },
        update: {
            [key]: dir
        }
    })
}

const createFileSystem = async (dir: string, force: boolean) => {
    // resolve the path
    dir = path.resolve(dir)

    // check if the provided directory exists
    const stats = await fs.stat(dir)
    if (stats.isDirectory() == false) throw new Error(`Not a directory`)

    // check if the directory is empty
    const dirStats = await fs.readdir(dir)

    // if the folder contains files, we check if the force flag was given
    if (dirStats.length != 0 && force == false) throw new Error(`Directory is not empty, use --force to override`)

    // now create files!
    await create(structure, dir)
}

export default async ({ name, dir, initialize, force = false }: AddVolumeImpl) => {
    // todo: check if this path is already a volume
    await createFileSystem(dir, force)
    await addVolumeToDatabase(name, dir)
}
