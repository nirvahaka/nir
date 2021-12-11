/*
 *  Uses Unsplash's API to get the wallpaper information & credits.
 *  Created On 11 December 2021
 */
import fetch from 'node-fetch';
import { createApi } from 'unsplash-js';
import { get } from '~cmds/config/get/lib/index.js';
export default async (photoId) => {
    // initialize a new Unsplash client
    const unsplash = createApi({
        fetch: fetch,
        accessKey: (await get('unsplash.access')).trim(),
    });
    const photo = await unsplash.photos.get({
        photoId,
    });
    if (photo.status == 200)
        return `Photo by ${photo.response.user.name} on Unsplash\nhttps://unsplash.com/photos/${photoId}`;
    if (photo.status == 404)
        return 'Photo was from Unsplash\nBut removed by the author';
    return "Photo from Unsplash\nCouldn't get photo information";
};
