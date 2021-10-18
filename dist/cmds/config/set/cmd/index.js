/*
 *  Writes a config entry within the database.
 *  Created On 18 October 2021
 */
import { Command } from 'commander';
export default new Command()
    .name('set')
    .description('Writes a config entry within the database.')
    .action(() => {
    console.log('set a config value');
});
