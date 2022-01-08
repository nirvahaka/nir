/*
 *  Synchronize video metadata between nirvahaka & YouTube.
 *  Created On 08 January 2022
 */
import { Command } from 'commander';
import { db } from '~database/index.js';
import getVideoCategory from '~util/getVideoCategory/index.js';
import interactiveSelectVideos from '~util/interactiveSelectVideos/index.js';
import getYouTube from '~vendor/youtube.js';
import syncMetadata from '../lib/index.js';
const action = async (query, { multiple, force }) => {
    let videos;
    // automatically fetch out of sync videos if not using
    // force, or else follow normal user input sequence
    if (force) {
        videos = await interactiveSelectVideos({
            multiple: Boolean(multiple),
            search: query.join(' ').trim(),
            where: {
                status: 'published',
            },
        });
    }
    else {
        videos = await db.video.findMany({
            where: {
                synced: false,
                status: 'published',
            },
        });
    }
    // get YouTube's authenticated API client
    const { auth, youtube } = await getYouTube();
    // get video category, as that's required for our next
    // requests to YouTube API
    const categoryId = await getVideoCategory(auth, youtube);
    const updated = await Promise.all(videos.map(video => syncMetadata({
        video,
        auth,
        categoryId,
        youtube,
    })));
};
export default new Command()
    .name('sync')
    .description('sync video metadata between nirvahaka & YouTube')
    .action(action)
    .argument('[queries...]')
    .option('--multiple', 'open multiple selected videos')
    .option('--force', 'allow syncing of already synced videos');
