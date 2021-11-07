"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var testorm_1 = __importDefault(require("./routes/testorm"));
var timetableRoute_1 = __importDefault(require("./routes/timetableRoute"));
var tableDataService_1 = __importDefault(require("./services/tableDataService"));
var NAMESPACE = 'Server';
//Connect to database
(0, typeorm_1.createConnection)()
    .then(function (connection) {
    logging_1.default.info(NAMESPACE, 'Server connected to database');
})
    .catch(function (error) {
    logging_1.default.info(NAMESPACE, error.message, error);
});
var router = (0, express_1.default)();
// Logging the request
router.use(function (req, res, next) {
    logging_1.default.info(NAMESPACE, "METHOD - [" + req.method + "], URL - [" + req.url + "],\n     IP - [" + req.socket.remoteAddress + "]");
    res.on('finish', function () {
        logging_1.default.info(NAMESPACE, "METHOD - [" + req.method + "], URL - [" + req.url + "], IP - [" + req.socket.remoteAddress + "],\n         STATUS - [" + res.statusCode + "]");
    });
    next();
});
//parse the request
router.use(body_parser_1.default.urlencoded({ extended: false }));
router.use(body_parser_1.default.json());
//RULES
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
        return res.status(200).json({});
    }
    next();
});
//Routes
router.use('/orm', testorm_1.default);
router.use('/timetable', timetableRoute_1.default);
// Error handling
router.use(function (req, res, next) {
    var error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
    next();
});
var httpServer = http_1.default.createServer(router);
httpServer.listen(config_1.default.server.port, function () { return logging_1.default.info(NAMESPACE, "Server running on " + config_1.default.server.hostname + ":" + config_1.default.server.port); });
//SYNCING AND DATA
var sync = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logging_1.default.info(NAMESPACE, 'Static and dynamic data sync in progress!');
                return [4 /*yield*/, tableDataService_1.default.syncStaticAndDynamic()];
            case 1:
                _a.sent();
                logging_1.default.info(NAMESPACE, 'Static and dynamic data synced');
                return [2 /*return*/];
        }
    });
}); };
//setInterval(sync, 15000);
