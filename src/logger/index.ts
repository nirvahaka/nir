/*
 *  This file configures itivrutaha.
 *  Created On 18 October 2021
 */

import chalk from 'chalk'
import itivrutaha from 'itivrutaha'

export let logger

const banner = `   ${chalk.redBright('_ __')}    \n ${chalk.redBright(
    ` | '_ \\`,
)}   🔬 ${chalk.bold.whiteBright(
    'nirvahaka',
)} is a CLI application 🚀\n  ${chalk.redBright(
    '| | | |',
)}  for structurally 📡 creating, managing\n  ${chalk.redBright(
    '|_| |_|',
)}  and storing 📹 video projects.\n`

export default async () => {
    console.log(banner)

    logger = await itivrutaha.createNewLogger({
        appName: 'nirvahaka',
        bootLog: false,
        shutdownLog: false,
        theme: {
            string: ':emoji :type :message',
        },
    })
}
