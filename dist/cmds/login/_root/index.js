/*
 *  Guides the user through generating access tokens, and stores
 *  them in the database.
 *  Created On 14 December 2021
 */
import { google } from 'googleapis';
import open from 'open';
import { get } from '../../config/get/lib/index.js';
import { set } from '../../config/set/lib/index.js';
import { host, port } from '../../../server/index.js';
import captureToken from '../../../server/tokens/index.js';
export default async () => {
    // define the scopes we need to manage
    // a particular YouTube channel
    const SCOPES = [
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/youtubepartner',
        'https://www.googleapis.com/auth/youtube',
        'https://www.googleapis.com/auth/youtube.force-ssl',
    ];
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2({
        clientId: await get('youtube.client'),
        clientSecret: await get('youtube.secret'),
        redirectUri: `http://${host}:${port}`,
    });
    // generate a new auth URL and redirect
    const endpoint = oauth2Client.generateAuthUrl({
        scope: SCOPES,
        access_type: 'offline',
    });
    // start the web server
    const code = await captureToken(async () => {
        await open(endpoint, {
            wait: false,
            allowNonzeroExitCode: true,
            newInstance: true,
        });
    });
    const { tokens: { access_token, refresh_token }, } = (await oauth2Client.getToken(code));
    await set('youtube.access', access_token);
    await set('youtube.refresh', refresh_token);
};
