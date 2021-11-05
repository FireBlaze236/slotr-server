import express from 'express';
import timetableController from '../controllers/timetableController';

const router = express.Router();

router.get('/get/:id', timetableController.getTimetableData);
router.post('/save', timetableController.saveTimetableData);
export = router;
