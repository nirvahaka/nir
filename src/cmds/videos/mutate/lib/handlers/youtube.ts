/*
 *  Marks a given video as published.
 *  Created On 12 December 2021
 */

import { db } from '~database/index.js'

export default async ({ youtube }, changed, original) => {
    await db.video.update({
        data: {
            youtube,
            status: youtube == null ? 'active' : 'published',
        },
        where: {
            slug: original.slug,
        },
    })
}
