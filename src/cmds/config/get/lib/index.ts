/*
 *  Library function that reads a config key into the database.
 *  Created On 19 October 2021
 */

import { db } from '../../../../database/index.js'

// todo: move this function to @vsnthdev/utilities
export const primitiveParse = (value: string) => {
    try {
        return JSON.parse(value)
    } catch {
        return value
    }
}

export const get = async (key: string) => {
    const value = await db.config.findFirst({
        where: {
            key,
        },
    })

    if (value == null) return null
    return typeof value.value == 'string'
        ? primitiveParse(value.value)
        : value.value
}
