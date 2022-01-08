/*
 *  Updates all possible metadata for a given video.
 *  Created On 08 January 2022
 */
import yaml from 'js-yaml';
import { DateTime } from 'luxon';
import { get } from '~cmds/config/get/lib/index.js';
import describe from '~cmds/videos/describe/lib/index.js';
import { db } from '~database/index.js';
export default async ({ auth, categoryId, video, youtube, }) => {
    // get both the description template & data
    const template = ((await get('description.template')) || '');
    const data = yaml.load(await get('description')) || {};
    const description = await describe({ data, template, video });
    // update metadata on YouTube
    await youtube.videos.update({
        auth,
        part: ['snippet', 'status', 'recordingDetails'],
        requestBody: {
            id: video.youtube,
            snippet: {
                categoryId,
                description,
                title: video.title,
            },
            recordingDetails: {
                recordingDate: DateTime.local().toISO().toString(),
            },
        },
    });
    // mark the video as synced
    await db.video.update({
        where: {
            slug: video.slug,
        },
        data: {
            synced: true,
        },
    });
};
