/*
 *  Fetches the selected video category from the database.
 *  Created On 16 December 2021
 */

import { OAuth2Client } from 'google-auth-library'
import { youtube_v3 } from 'googleapis'

import { get } from '~cmds/config/get/lib/index.js'

export default async (
    auth: OAuth2Client,
    youtube: youtube_v3.Youtube,
): Promise<string> => {
    const {
        data: { items: categories },
    } = await youtube.videoCategories.list({
        auth,
        part: ['snippet'],
        regionCode: await get('youtube.region'),
    })

    const category = await get('youtube.category')

    const { id } = categories.find(({ snippet }) => snippet.title == category)

    return id
}
