/*
 *  Initializes an authenticated YouTube API client on demand.
 *  Created On 16 December 2021
 */
import { google } from 'googleapis';
import { get } from '~cmds/config/get/lib/index.js';
import { set } from '~cmds/config/set/lib/index.js';
export default async () => {
    // create a new authentication client
    const auth = new google.auth.OAuth2({
        clientId: await get('youtube.client'),
        clientSecret: await get('youtube.secret'),
        redirectUri: await get('youtube.redirect'),
    });
    // pick credentials from the database
    auth.setCredentials({
        access_token: await get('youtube.access'),
        refresh_token: await get('youtube.refresh'),
    });
    // keep our database updated if tokens have changed
    auth.on('tokens', async (tokens) => {
        if (tokens.refresh_token)
            set('youtube.refresh', tokens.refresh_token);
        if (tokens.access_token)
            set('youtube.access', tokens.access_token);
    });
    // create a new YouTube client
    const youtube = google.youtube('v3');
    // return both the auth & client
    return { auth, youtube };
};
