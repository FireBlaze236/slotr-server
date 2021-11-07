"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var testorm_1 = __importDefault(require("../controllers/testorm"));
var router = express_1.default.Router();
router.get('/get', testorm_1.default.ormGetCheck);
router.post('/post', testorm_1.default.ormPostCheck);
module.exports = router;
