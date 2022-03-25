/*
 *  Returns a random string of gratitude greeting everything invoked.
 *  Created On 25 March 2022
 */
const greetings = [
    '😊 Thank you for watching!',
    '👏 Have an awesome day!',
    'Keep rocking 🤘',
    'Keep knowing, keep growing 🤓',
];
export default async () => greetings[Math.floor(Math.random() * greetings.length)];
