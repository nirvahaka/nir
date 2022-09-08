/*
 *  Marks a given video as published.
 *  Created On 12 December 2021
 */
import { DateTime } from 'luxon';
import { db } from '../../../../../database/index.js';
import getYouTube from '../../../../../vendor/youtube.js';
export default async ({ youtube: id }, changed, original) => {
    // get YouTube's authenticated API client
    const { auth, youtube } = await getYouTube();
    let published = null;
    if (id != null) {
        const meta = await youtube.videos.list({
            id,
            auth,
            part: ['snippet', 'status', 'liveStreamingDetails'],
        });
        // meta.data.items[0].snippet.publishedAt
        published = meta.data.items[0].status.publishAt
            || meta.data.items[0].snippet.publishedAt;
    }
    await db.video.update({
        data: {
            youtube: id,
            status: id == null ? 'active' : 'published',
            published: id == null ? null : DateTime.fromISO(published).toJSDate(),
        },
        where: {
            slug: original.slug,
        },
    });
};
