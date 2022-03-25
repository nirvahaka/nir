/*
 *  Outputs a custom article provided it's link.
 *  Created On 25 March 2022
 */
import axios from 'axios';
import metascraper from 'metascraper';
import title from 'metascraper-title';
import safeLink from './link';
export default async (link) => {
    const { data } = await axios({
        method: 'GET',
        url: link,
    });
    const getMeta = metascraper([title()]);
    const meta = await getMeta({ url: link, html: data });
    return `${meta.title}\n${safeLink(link)}`;
};
