/*
 *  Gets an string array of all keys in the config.
 *  Created On 19 October 2021
 */
import { db } from '~database/index.js';
export const keys = async () => {
    const all = await db.config.findMany();
    const keys = [];
    for (const { key } of all)
        keys.push(key);
    return keys;
};
