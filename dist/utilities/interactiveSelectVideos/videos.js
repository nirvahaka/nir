/*
 *  Searches or returns a full list of videos from the database.
 *  Created On 09 December 2021
 */
import { object } from '@vsnthdev/utilities-node';
import { db } from '~database/index.js';
export const transformVideos = (videos) => videos.map(video => {
    object.renameKey('title', 'name', video);
    object.renameKey('slug', 'value', video);
    object.renameKey('volumeName', 'hint', video);
    return video;
});
export const populateVideoFully = async (videos) => {
    for (const index in videos) {
        const { slug } = videos[index];
        videos[index] = await db.video.findFirst({
            include: {
                volume: true,
            },
            where: {
                slug,
            },
        });
    }
    return videos;
};
export default async (search) => {
    const select = {
        slug: true,
        title: true,
        volumeName: true,
    };
    if (search) {
        // a workaround to support multiple words
        // in full text search in Prisma.js
        // see https://github.com/prisma/docs/issues/2233
        search = search.split(' ').join(' & ');
        return await db.video.findMany({
            select,
            where: {
                slug: { search },
                title: { search },
                volumeName: { search },
            },
            orderBy: {
                created: 'desc',
            },
        });
    }
    return await db.video.findMany({
        select,
        orderBy: {
            created: 'desc',
        },
    });
};