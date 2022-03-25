/*
 *  Takes a video ID & returns a video description block.
 *  Created On 25 March 2022
 */
import getYouTube from '~vendor/youtube.js';
export default async (id) => {
    // get YouTube's authenticated API client
    const { auth, youtube } = await getYouTube();
    // get video details
    const { data: { items }, } = await youtube.videos.list({
        id,
        auth,
        part: ['snippet'],
    });
    const video = items[0].snippet;
    return `${video.title}\nhttps://youtu.be/${id}`;
};
