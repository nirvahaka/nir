/*
 *  Web server that will resolve once it gets a token.
 *  Created On 14 December 2021
 */
import chalk from 'chalk';
import express from 'express';
import { logger } from '../../logger/index.js';
import { host, port } from '../index.js';
export default (onStart) => new Promise(resolve => {
    const app = express();
    const server = app.listen(port, host, () => {
        logger.info(`Server listening on ${chalk.gray.underline('http://' + host + ':' + port)}`);
        onStart();
    });
    app.get('/', (req, res) => {
        res.set('Connection', 'close')
            .send('<script>window.close()</script>')
            .end(() => {
            server.close(() => {
                resolve(req.query.code);
            });
        });
    });
});
