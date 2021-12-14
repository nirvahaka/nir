/*
 *  Guides the user through generating access tokens, and stores
 *  them in the database.
 *  Created On 14 December 2021
 */

import { Command } from 'commander'

import action from './_root/index.js'

export default new Command()
    .name('login')
    .description('authenticate with the YouTube API')
    .action(action)
    .allowExcessArguments(false)
    .allowUnknownOption(false)
