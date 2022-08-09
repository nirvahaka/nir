/*
 *  Removes a given video from both database and filesystem
 *  if it's status is active.
 *  Created On 10 December 2021
 */
import path from 'path';
import rimraf from 'rimraf';
import { getPlatformPathString } from '../../../volumes/add/lib/index.js';
import { db } from '../../../../database/index.js';
export default async (slug) => {
    // check if the video has an active status
    const { status, volume } = await db.video.findFirst({
        where: { slug },
        include: { volume: true },
    });
    // only allowing deletion of videos with status active
    // so that published, archived videos cannot be accidentally
    // deleted or misused
    if (status != 'active')
        throw new Error(`Only videos with an "active" status can be removed.`);
    // delete the video from the database
    await db.video.delete({
        where: { slug },
    });
    // now delete from the filesystem
    const key = getPlatformPathString();
    await rimraf.sync(path.join(volume[key], 'Workarea', 'Video', slug));
};
