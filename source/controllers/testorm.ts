import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import { getConnection } from 'typeorm';

import { User } from '../entity/User';

const NAMESPACE = 'ORM connection test';

const ormGetCheck = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'ORM get route called');

    let users = await getConnection().manager.find(User);

    return res.status(200).json({
        users
    });
};

const ormPostCheck = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'ORM post route called');

    let { id, name } = req.body;

    let user = new User();
    user.id = id;
    user.name = name;

    await getConnection().manager.save(user);

    return res.status(200).json({
        message: 'User created'
    });
};

export default { ormGetCheck, ormPostCheck };
