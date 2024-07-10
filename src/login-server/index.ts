import { createServer } from 'node:net';

import { DB } from '#database';

// @ts-ignore
import Client from '../../LoginServer/Client'
// @ts-ignore
import database from './../../Database/index.js'

async function main() {
    const host = process.env.LOGIN_SERVER_HOST || '0.0.0.0';
    const port = Number(process.env.LOGIN_SERVER_PORT) || 2106;

    const server = createServer((socket) => {
        new Client(socket);
    });

    // @TODO: !!!
    try {
        await database.connect(() => {
            console.log("database connected: success");
        });
    } catch(e) {
        // @ts-ignore
        console.log(e.message);

        return;
    }

    server.listen(port, host, () => {
        console.log(`Login server listening on ${host}:${port}`);
    });
}

main()
    .then(async () => {
        await DB.client.$disconnect();
    })
    .catch(async (error) => {
        console.error(error);

        await DB.client.$disconnect();

        process.exit(1);
    })