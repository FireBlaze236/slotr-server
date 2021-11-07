import http from 'http';
import express from 'express';
import bodyparser from 'body-parser';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import logging from './config/logging';
import config from './config/config';

import dbtest from './routes/testorm';
import timetableRoute from './routes/timetableRoute';
import tableDataService from './services/tableDataService';

const cors = require('cors');

const NAMESPACE = 'Server';

//Connect to database
createConnection()
    .then((connection) => {
        logging.info(NAMESPACE, 'Server connected to database');
    })
    .catch((error) => {
        logging.info(NAMESPACE, error.message, error);
    });

const router = express();

router.use(cors());

// Logging the request
router.use((req, res, next) => {
    logging.info(
        NAMESPACE,
        `METHOD - [${req.method}], URL - [${req.url}],
     IP - [${req.socket.remoteAddress}]`
    );

    res.on('finish', () => {
        logging.info(
            NAMESPACE,
            `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}],
         STATUS - [${res.statusCode}]`
        );
    });

    next();
});

//parse the request
router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

//RULES

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }

    next();
});

//Routes
router.use('/orm', dbtest);
router.use('/timetable', timetableRoute);

// Error handling
router.use((req, res, next) => {
    const error = new Error('not found');

    return res.status(404).json({
        message: error.message
    });

    next();
});

const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`));

//SYNCING AND DATA
const sync = async () => {
    logging.info(NAMESPACE, 'Static and dynamic data sync in progress!');
    await tableDataService.syncStaticAndDynamic();

    logging.info(NAMESPACE, 'Static and dynamic data synced');
};

//setInterval(sync, 15000);
