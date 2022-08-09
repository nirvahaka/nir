/*
 *  Gets details of all volumes and the active volume and returns
 *  them as an object.
 *  Created On 01 December 2021
 */
import { getPlatformPathString } from '../../../volumes/add/lib/index.js';
import { db } from '../../../../database/index.js';
export default async () => {
    // get all volumes from the database
    // while filtering paths for other operating systems
    const key = getPlatformPathString();
    let volumes = await db.volume.findMany({
        select: {
            name: true,
            [key]: true,
        },
    });
    volumes = volumes.map(volume => {
        volume['path'] = volume[key];
        delete volume[key];
        return volume;
    });
    return volumes;
};
