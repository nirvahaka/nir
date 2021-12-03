/*
 *  Pretty prints a nice table of all registered volumes.
 *  Created On 01 December 2021
 */

import { highlight } from 'cli-highlight'
import Table from 'cli-table'

import getVolumes from '../lib/index.js'

export default async ({ pretty }) => {
    // get all volumes
    const volumes = await getVolumes()

    // first we'll handle printing JSON
    if (pretty == false) {
        const json = JSON.stringify(volumes, null, 2)
        const output = process.stdout.isTTY
            ? highlight(json, { language: 'json', ignoreIllegals: true })
            : json
        console.log(output)

        // halt execution here
        return
    }

    // create a new table instance
    const table = new Table({
        head: ['Name', 'Path'],
    })

    // lop through all volumes and add them to the table
    for (const volume of volumes) table.push([volume['name'], volume['path']])

    // show table
    console.log(table.toString())
}
