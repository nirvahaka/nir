/*
 *  Updates the description of a given video if changed.
 *  Created On 15 December 2021
 */
import merge from 'deepmerge';
import { db } from '../../../../../database/index.js';
export default async ({ description }, changed, original) => {
    description = merge(original.description, description);
    await db.video.update({
        data: {
            description: JSON.stringify(description),
        },
        where: {
            slug: original.slug,
        },
    });
};
