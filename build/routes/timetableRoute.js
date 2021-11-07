"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var timetableController_1 = __importDefault(require("../controllers/timetableController"));
var router = express_1.default.Router();
router.get('/get/:id', timetableController_1.default.getTimetableData);
router.get('/getstatic/:id', timetableController_1.default.getStaticTimetableData);
router.post('/save', timetableController_1.default.saveTimetableDataDynamic);
router.post('/savestatic', timetableController_1.default.saveTimetableDataStatic);
module.exports = router;
