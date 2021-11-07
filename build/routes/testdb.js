"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var testdb_1 = __importDefault(require("../controllers/testdb"));
var router = express_1.default.Router();
router.get('/get', testdb_1.default.databaseGetCheck);
router.post('/post', testdb_1.default.databasePostCheck);
module.exports = router;
