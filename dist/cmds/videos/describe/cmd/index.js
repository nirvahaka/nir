/*
 *  Dynamically renders a description for selected videos.
 *  Created On 11 December 2021
 */
import { Command } from 'commander';
import yaml from 'js-yaml';
import readFileInput from 'read-file-input';
import { get } from '../../../config/get/lib/index.js';
import interactiveSelectVideos from '../../../../utilities/interactiveSelectVideos/index.js';
import describe from '../lib/index.js';
const action = async (query, { multiple, editor }) => {
    // interactively ask the user
    // which video(s) he/she/they wants to operate on
    const videos = await interactiveSelectVideos({
        multiple: Boolean(multiple),
        search: query.join(' ').trim(),
    });
    // get both the description template & data
    const template = ((await get('description.template')) || '');
    const data = yaml.load(await get('description')) || {};
    // loop through each video and generate the description
    // in async and then resolve promise when all of them are done
    const descriptions = await Promise.all(videos.map(video => describe({ data, template, video })));
    // use editor automatically if there's more then one video
    if (descriptions.length > 1 || editor == true) {
        // open the configured editor as per request
        for (const data of descriptions) {
            readFileInput({
                noWait: true,
                editor: await get('editor'),
                content: {
                    data,
                },
            });
        }
    }
    else {
        console.log(descriptions[0]);
    }
};
export default new Command()
    .name('describe')
    .description('preview description for selected videos')
    .action(action)
    .argument('[queries...]')
    .option('--multiple', 'preview description for multiple videos')
    .option('--editor', 'open the description in the editor instead of outputing');
