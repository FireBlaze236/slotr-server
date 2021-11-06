import express from 'express';
import timetableController from '../controllers/timetableController';

const router = express.Router();

router.get('/get/:id', timetableController.getTimetableData);
router.get('/getstatic/:id', timetableController.getStaticTimetableData);
router.post('/save', timetableController.saveTimetableDataDynamic);
router.post('/savestatic', timetableController.saveTimetableDataStatic);
export = router;
