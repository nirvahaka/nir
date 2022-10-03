/*
 *  Outputs YouTube compatible timestamps in the description.
 *  Created On 12 June 2022
 */
export default async (stamps) => {
    // handle when there are no timestamps
    if (Object.keys(stamps).length == 0)
        return '';
    // ensure, all sections of a timestamp contain both digits
    for (const key in stamps) {
        // the new key of the object
        // which ensures that a 0 is in the beginning
        // if it's only one digit
        const newKey = key.split(':')
            .map(sec => sec.length < 2 ? `0${sec}` : sec)
            .join(':');
        // capturing old value
        const oldValue = stamps[key];
        delete stamps[key];
        stamps[newKey] = oldValue;
    }
    // add introduction if missing
    if (Object.keys(stamps)[0] != '00:00') {
        stamps = Object.assign({ '00:00': 'Introduction' }, stamps);
    }
    // sort them in proper order, so they don't get out of place
    const sortedStamps = Object.keys(stamps).sort((a, b) => {
        if (Number(a.replace(':', '')) < Number(b.replace(':', ''))) {
            return -1;
        }
        else if (Number(a.replace(':', '')) > Number(b.replace(':', ''))) {
            return 1;
        }
        else {
            return 0;
        }
    });
    const returnable = [];
    for (const time of sortedStamps)
        returnable.push(`${time}   ${stamps[time]}`);
    return returnable.join('\n');
};
