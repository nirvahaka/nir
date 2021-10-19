/*
 *  Library function that writes a config key into the database.
 *  Created On 19 October 2021
 */

import { db } from '../../../../database/index.js';

export const set = async (key: string, value: string) => {
    if (value == 'null')
        return await db.config.delete({
            where: {
                key
            }
        })

    try {
        await db.config.create({
            data: {
                key,
                value,
            }
        })
    } catch {
        await db.config.update({
            where: {
                key,
            },
            data: {
                value
            }
        })
    }
}