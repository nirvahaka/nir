/*
 *  Updates the titles of videos if they changed.
 *  Created On 12 December 2021
 */
import { db } from '~database/index.js';
export default async ({ title }, changed, original) => {
    await db.video.update({
        data: {
            title,
        },
        where: {
            slug: original.slug,
        },
    });
};
