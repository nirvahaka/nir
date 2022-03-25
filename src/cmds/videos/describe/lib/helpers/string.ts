/*
 *  Outputs a plain string into the description.
 *  Created On 25 March 2022
 */

interface Properties {
    title: string
    content: string
}

export default async ({ hash }: { hash: Properties }) => {
    const { title, content } = hash

    return `${title}\n${content}`
}
