/*
 *  Generates description of a given video, by taking in
 *  a handlebars template, base data and video specific data.
 *  Created On 11 December 2021
 */
import merge from 'deepmerge';
import dirname from 'es-dirname';
import glob from 'glob';
import { google } from 'googleapis';
import handlebars from 'handlebars';
import yaml from 'js-yaml';
import path from 'path';
import promisedHandlebars from 'promised-handlebars';
import { get } from '~cmds/config/get/lib/index.js';
import { set } from '~cmds/config/set/lib/index.js';
// create an instance of promised handlebars
// templating engine
const hbs = promisedHandlebars(handlebars);
export default async ({ data, reflect, template, video }) => {
    // parse the specific description
    const specific = yaml.load(video.description) || {};
    // override the specific with data
    data = merge(data, specific);
    // load the helpers
    const helperFiles = glob.sync(path.join(dirname(), 'helpers', '*.js'));
    // loop through each JavaScript file and register
    // it's default function as a Handlebars helper
    for (const file of helperFiles) {
        const { name } = path.parse(file);
        const { default: helper } = await import(`file://${file}`);
        hbs.registerHelper(name, helper);
    }
    // compile the handlebars template
    const compile = hbs.compile(template);
    // render our compiled data
    const description = await compile(data);
    // if we don't need to reflect, we'll show it
    // and terminate here
    if (!reflect) {
        console.log(description.trim());
        return;
    }
    // let's update the description on YouTube
    // create a new authentication client
    const auth = new google.auth.OAuth2({
        clientId: await get('youtube.client'),
        clientSecret: await get('youtube.secret'),
        redirectUri: await get('youtube.redirect'),
    });
    auth.setCredentials({
        access_token: await get('youtube.access'),
        refresh_token: await get('youtube.refresh'),
    });
    auth.on('tokens', async (tokens) => {
        if (tokens.refresh_token)
            set('youtube.refresh', tokens.refresh_token);
        if (tokens.access_token)
            set('youtube.access', tokens.access_token);
    });
    const youtube = google.youtube('v3');
    const { data: { items: categories }, } = await youtube.videoCategories.list({
        auth,
        part: ['snippet'],
        regionCode: await get('youtube.region'),
    });
    const category = await get('youtube.category');
    const { id: categoryId } = categories.find(({ snippet }) => snippet.title == category);
    await youtube.videos.update({
        auth,
        part: ['snippet'],
        requestBody: {
            id: video.youtube,
            snippet: {
                categoryId,
                description: description.trim(),
                title: video.title,
            },
        },
    });
};
