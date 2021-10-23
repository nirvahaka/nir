/*
 *  Establishes a connection to the database and stores
 *  the connected object in memory.
 *  Created On 19 October 2021
 */
import prisma from '@prisma/client';
export let db;
export default async () => {
    // skip connecting to the database when working with the
    // database URL itself
    if (process.argv.join(' ').includes('config set database'))
        return;
    // only connect to the database if there's one configured
    if (process.env.DATABASE_URL)
        db = new prisma.PrismaClient();
};
