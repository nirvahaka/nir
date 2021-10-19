/*
 *  Establishes a connection to the database and stores
 *  the connected object in memory.
 *  Created On 19 October 2021
 */
import prisma from '@prisma/client';
export let db;
export default async () => {
    db = new prisma.PrismaClient();
};
