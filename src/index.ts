#!/usr/bin/env node
/*
 *  Entry executable file for nirvahaka's CLI app.
 *  Created On 18 October 2021
 */

import logger from './logger/index.js'
import cmds from './cmds/index.js'
import database from './database/index.js'

await database()
await logger()
await cmds()