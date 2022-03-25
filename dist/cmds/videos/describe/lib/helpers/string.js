/*
 *  Outputs a plain string into the description.
 *  Created On 25 March 2022
 */
export default async ({ hash }) => {
    const { title, content } = hash;
    return `${title}\n${content}`;
};
