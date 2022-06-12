/*
 *  Outputs YouTube compatible timestamps in the description.
 *  Created On 12 June 2022
 */
export default async (stamps) => {
    // handle when there are no timestamps
    if (Object.keys(stamps).length == 0)
        return '';
    if (Object.keys(stamps)[0] != '00:00') {
        stamps = Object.assign({ '00:00': 'Introduction' }, stamps);
    }
    const returnable = [];
    for (const time in stamps)
        returnable.push(`${time}   ${stamps[time]}`);
    return returnable.join('\n');
};
