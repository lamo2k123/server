import { PrismaClient } from '@prisma/client';

class DataBase {

    public client = new PrismaClient();

}

export const DB = new DataBase();