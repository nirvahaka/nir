/*
 *  Creates close captions if the given video contains a Script.nir file.
 *  Created On 10 December 2021
 */

import { video } from '@prisma/client'
import { promise } from '@vsnthdev/utilities-node'
import fs from 'fs/promises'
import path from 'path'

export default async ({
    key,
    video,
}: {
    key: string
    video: video
}): Promise<boolean> => {
    const scriptPath = path.join(
        video['volume'][key],
        'Workarea',
        'Video',
        video.slug,
        'Metadata',
        'Script.nir',
    )

    // attempt to read the file
    const { err, returned } = await promise.handle(
        fs.readFile(scriptPath, 'utf-8'),
    )

    // handle reading errors
    if (err) return false

    // do some regex operations to convert script
    // into a plain close captions file without timings
    const content =
        returned
            .replace(/(\{\{.+\}\})/g, '')
            .replace(/\r\n|\n|\r/gm, ' ')
            .replace(/  +/g, ' ') + '\n'

    // write the captions file
    await fs.writeFile(
        path.join(path.dirname(scriptPath), 'Captions.txt'),
        content,
        'utf-8',
    )

    return true
}
