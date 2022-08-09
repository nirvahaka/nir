/*
 *  Returns a playlist block with the video block combined.
 *  Created On 26 March 2022
 */
import getYouTube from '../../../../../vendor/youtube.js';
export default async (id) => {
    // get YouTube's authenticated API client
    const { auth, youtube } = await getYouTube();
    const { data } = await youtube.playlists.list({
        id,
        auth,
        part: ['snippet'],
    });
    return `${data.items[0].snippet.title}\nhttps://youtube.com/playlist?list=${id}`;
};
