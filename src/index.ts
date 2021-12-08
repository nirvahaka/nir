#!/usr/bin/env node
/*
 *  Entry executable file for nirvahaka's CLI app.
 *  Created On 18 October 2021
 */

import dotenv from 'dotenv'

import cmds from '~cmds/index.js'
import database from '~database/index.js'
import logger from '~logger/index.js'

// load the environment variables
dotenv.config()

// initialize the logger
await logger()

// connect to the database
await database()

// parse command line arguments
await cmds()
