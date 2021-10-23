/*
 *  Reads all configuration keys and outputs them in different formats.
 *  Created On 19 October 2021
 */

import { keys } from '../lib/index.js';

export const action = async ({format}) => {
    if (format != 'string') throw new Error('not implemented yet')

    const all = await keys()
    console.log(
        all.join(
            '\n'
        )
    )
}