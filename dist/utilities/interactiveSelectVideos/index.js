/*
 *  This utility let's the user search for videos and select one
 *  or more depending on the configuration.
 *  Created On 09 December 2021
 */
import enquirer from 'enquirer';
import getVideos, { populateVideoFully, transformVideos } from './videos.js';
export default async (config) => {
    // get all videos from the database
    const videos = await getVideos(config);
    // return that entry if there's only one video
    if (videos.length == 1)
        return await populateVideoFully(videos);
    // else, let's show a CLI autocomplete or multi-select prompt
    // depending on whether the user wants multiple videos, note
    // that we always respond in fully populated array of videos
    let { selected } = (await enquirer.prompt({
        name: 'selected',
        type: config.multiple ? 'multiselect' : 'autocomplete',
        message: config.multiple
            ? 'Select multiple videos'
            : 'Search for a video',
        choices: transformVideos(videos),
        limit: 8,
    }));
    selected = [selected].flat();
    // map the selected onces to partial objects
    for (const index in selected) {
        const key = config.multiple ? 'name' : 'value';
        selected[index] = {
            slug: videos.find(video => video[key] == selected[index])['value'],
        };
    }
    return await populateVideoFully(selected);
};
