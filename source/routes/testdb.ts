import express from 'express';
import database from '../controllers/testdb';

const router = express.Router();

router.get('/get', database.databaseGetCheck);
router.post('/post', database.databasePostCheck);

export = router;
