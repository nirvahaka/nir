/*
 *  Generates description of a given video, by taking in
 *  a handlebars template, base data and video specific data.
 *  Created On 11 December 2021
 */

import type { video } from '@prisma/client'
import merge from 'deepmerge'
import dirname from 'es-dirname'
import glob from 'glob'
import handlebars from 'handlebars'
import yaml from 'js-yaml'
import path from 'path'
import promisedHandlebars from 'promised-handlebars'
import { helpers } from './helpers/index.js'

// create an instance of promised handlebars
// templating engine
const hbs = promisedHandlebars(handlebars)

interface DescribeConfig {
    data: any
    template: string
    video: video
}

export default async ({
    data,
    template,
    video,
}: DescribeConfig): Promise<string> => {
    // parse the specific description
    const specific = yaml.load(video.description) || {}

    // override the specific with data
    data = merge(data, specific)

    // make sure, strings don't have newlines at the end
    // because they would conflict with Handlebars template newlines
    for (const key in data)
        if (typeof data[key] == 'string') data[key] = data[key].trim()

    // load the helpers
    // const helperFiles = glob.sync(path.join(dirname(), 'helpers', '*.js'))

    // loop through each JavaScript file and register
    // it's default function as a Handlebars helper
    for (const name in helpers) {
        const helper = helpers[name]
        hbs.registerHelper(name, helper)
    }

    // compile the handlebars template
    const compile = hbs.compile(template, { noEscape: true })

    // render our compiled data into description & return
    return (await compile(data)).replace(/\n\s*\n/g, '\n\n').trim()
}
