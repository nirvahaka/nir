/*
 *  Generates description of a given video, by taking in
 *  a handlebars template, base data and video specific data.
 *  Created On 11 December 2021
 */

import { video } from '@prisma/client'
import merge from 'deepmerge'
import dirname from 'es-dirname'
import glob from 'glob'
import handlebars from 'handlebars'
import yaml from 'js-yaml'
import path from 'path'
import promisedHandlebars from 'promised-handlebars'

import getVideoCategory from '~util/getVideoCategory/index.js'
import getYouTube from '~vendor/youtube.js'

// create an instance of promised handlebars
// templating engine
const hbs = promisedHandlebars(handlebars)

interface DescribeConfig {
    data: unknown
    template: string
    video: video
    reflect: boolean
}

export default async ({ data, reflect, template, video }: DescribeConfig) => {
    // parse the specific description
    const specific = yaml.load(video.description) || {}

    // override the specific with data
    data = merge(data, specific)

    // load the helpers
    const helperFiles = glob.sync(path.join(dirname(), 'helpers', '*.js'))

    // loop through each JavaScript file and register
    // it's default function as a Handlebars helper
    for (const file of helperFiles) {
        const { name } = path.parse(file)
        const { default: helper } = await import(`file://${file}`)

        hbs.registerHelper(name, helper)
    }

    // compile the handlebars template
    const compile = hbs.compile(template)

    // render our compiled data
    const description = await compile(data)

    // if we don't need to reflect, we'll show it
    // and terminate here
    if (!reflect) {
        console.log(description.trim())
        return
    }

    // get the YouTube client
    const { auth, youtube } = await getYouTube()

    // get the video category
    const categoryId = await getVideoCategory(auth, youtube)

    // let's update the description on YouTube
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
    })
}
