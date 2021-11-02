import express from 'express';
import ormdb from '../controllers/testorm';

const router = express.Router();

router.get('/get', ormdb.ormGetCheck);
router.post('/post', ormdb.ormPostCheck);

export = router;
