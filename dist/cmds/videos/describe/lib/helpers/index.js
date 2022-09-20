/*
 *  Exports all the helpers as one single object
 *  into Handlebars engine.
 *  Created On 20 September 2022
 */
import article from './article.js';
import greeting from './greeting.js';
import link from './link.js';
import playlist from './playlist.js';
import string from './string.js';
import timestamps from './timestamps.js';
import unsplash from './unsplash.js';
import video from './video.js';
export const helpers = {
    article,
    greeting,
    link,
    playlist,
    string,
    timestamps,
    unsplash,
    video,
};
