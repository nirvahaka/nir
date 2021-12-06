/*
 *  Create a new video resource in the active volume.
 *  Created On 06 December 2021
 */

import { DateTime } from 'luxon'
import path from 'path'
import rcp from 'recursive-copy'

import { db } from '../../../../database/index.js'
import { getPlatformPathString } from '../../../volumes/add/lib/index.js'
import { volume } from '.prisma/client'

const filesystem = async (video, volume: volume) => {
    // todo: handle when the volume doesn't have a path
    // for this operating system
    const key = getPlatformPathString()

    const paths = {
        src: path.join(volume[key], 'Templates', video.type),
        dest: path.join(volume[key], 'Workarea', video.type, video.slug),
    }

    await rcp(paths.src, paths.dest)
}

const database = async (video, volume: volume) =>
    await db.video.create({
        data: {
            slug: video.slug,
            title: video.title,
            created: DateTime.now().toLocal().toJSDate(),
            description: '',
            volume: {
                connect: {
                    name: volume.name,
                },
            },
        },
    })

export default async (video, volume: volume) => {
    // create a video on filesystem
    await filesystem(video, volume)

    // create a video on database
    await database(video, volume)
}
