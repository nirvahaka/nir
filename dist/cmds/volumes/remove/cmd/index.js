/*
 *  Deletes a volume from both filesystem and database.
 *  Created On 03 December 2021
 */
import { Command } from 'commander';
import rimraf from 'rimraf';
import { get } from '~cmds/config/get/lib/index.js';
import { set } from '~cmds/config/set/lib/index.js';
import { db } from '~database/index.js';
import { logger } from '~logger/index.js';
import { getPlatformPathString } from '../../add/lib/index.js';
const action = async (name) => {
    const isActive = (await get('volumes.active')) == name;
    const key = getPlatformPathString();
    // get the volume path
    const volume = await db.volume.findFirst({
        where: {
            name,
        },
    });
    // todo: handle when no volume is found
    // delete from the filesystem
    rimraf.sync(volume[key]);
    // first delete all the videos and then
    // the volume itself from the database
    await db.video.deleteMany({
        where: {
            volume: {
                name,
            },
        },
    });
    await db.volume.delete({
        where: {
            name,
        },
    });
    // optionally, remove the volumes.active config
    // if this is the active volume
    if (isActive)
        await set('volumes.active');
    logger.success(`Removed ${name} volume along with it's content`);
    if (isActive)
        logger.warning('Active volume has been removed');
    logger.info('Volume will be inaccessible from next invocation');
};
export default new Command()
    .name('remove')
    .description("deletes a given volume including it's content")
    .argument('<name>', 'unique name of the volume')
    .action(action);
