/*
 *  Fetches the selected video category from the database.
 *  Created On 16 December 2021
 */
import { get } from '../../cmds/config/get/lib/index.js';
export default async (auth, youtube) => {
    const { data: { items: categories }, } = await youtube.videoCategories.list({
        auth,
        part: ['snippet'],
        regionCode: await get('youtube.region'),
    });
    const category = await get('youtube.category');
    const { id } = categories.find(({ snippet }) => snippet.title == category);
    return id;
};
