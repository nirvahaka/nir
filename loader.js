/*
 *  A custom ESModule loader will support for aliases.
 *  Created On 07 December 2021
 */

// Run with the following flags 👇
// --no-warnings --experimental-modules --es-module-specifier-resolution=node --loader loader.js

import dirname from 'es-dirname'
import path from 'path'

import app from './package.json' assert { type: 'json' }

const get = () => {
    const aliases = app.aliases || {}

    const absolute = Object.keys(aliases).reduce(
        (acc, key) =>
            aliases[key][0] === '/'
                ? acc
                : { ...acc, [key]: path.join(dirname(), aliases[key]) },
        aliases,
    )

    return absolute
}

const isAliasInSpecifier = (path, alias) => {
    return (
        path.indexOf(alias) === 0 &&
        (path.length === alias.length || path[alias.length] === '/')
    )
}

const aliases = get()

export const resolve = (specifier, parentModuleURL, defaultResolve) => {
    const alias = Object.keys(aliases).find(key =>
        isAliasInSpecifier(specifier, key),
    )

    const newSpecifier =
        alias === undefined
            ? specifier
            : 'file://' +
              path.join(aliases[alias], specifier.substr(alias.length))

    return defaultResolve(newSpecifier, parentModuleURL)
}
