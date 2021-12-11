/*
 *  Ensures that all links are HTTPS and that we don't allow
 *  insecure links in our video descriptions.
 *  Created On 11 December 2021
 */

import parse from 'url-parse'

export default input => {
    // parse the URL given
    const parsed = parse(input)

    // force convert all links to HTTPS
    if (['http', ''].includes(parsed.protocol.slice(0, -1)))
        parsed.set('protocol', 'https')

    // remove tailing slashes to make it good
    if (parsed.pathname.endsWith('/'))
        parsed.set('pathname', parsed.pathname.slice(0, -1))

    // return the formatted URL string back
    return parsed.toString()
}
