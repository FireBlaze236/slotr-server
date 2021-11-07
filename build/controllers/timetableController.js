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
var logging_1 = __importDefault(require("../config/logging"));
var tableDataService_1 = __importDefault(require("../services/tableDataService"));
var NAMESPACE = 'Timetable Controller';
var saveTimetableDataStatic = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logging_1.default.info(NAMESPACE, 'Timetable controller save table data STATIC route called.');
                if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                    logging_1.default.error(NAMESPACE, 'Route save STATIC called without body');
                    return [2 /*return*/, res.status(400).json({
                            message: 'Request without body'
                        })];
                }
                else if (req.body.timetable == undefined) {
                    logging_1.default.error(NAMESPACE, 'Route save STATIC called with invalid request body');
                    return [2 /*return*/, res.status(400).json({
                            message: 'Request with invalid body'
                        })];
                }
                data = req.body.timetable;
                return [4 /*yield*/, tableDataService_1.default.saveStaticTableData(data)];
            case 1:
                success = _a.sent();
                if (success != undefined && data != undefined) {
                    data.id = success;
                    return [2 /*return*/, res.status(200).json({
                            message: 'Save STATIC Route success',
                            dataSaved: data
                        })];
                }
                else {
                    return [2 /*return*/, res.status(500).json({
                            message: 'Save STATIC failed',
                            failData: data
                        })];
                }
                return [2 /*return*/];
        }
    });
}); };
var saveTimetableDataDynamic = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var data, success;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logging_1.default.info(NAMESPACE, 'Timetable controller save table data route called.');
                if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                    logging_1.default.error(NAMESPACE, 'Route save DYNAMIC called without body');
                    return [2 /*return*/, res.status(400).json({
                            message: 'Request without body'
                        })];
                }
                else if (req.body.timetable == undefined) {
                    logging_1.default.error(NAMESPACE, 'Route save DYNAMIC called with invalid request body');
                    return [2 /*return*/, res.status(400).json({
                            message: 'Request with invalid body'
                        })];
                }
                data = req.body.timetable;
                return [4 /*yield*/, tableDataService_1.default.saveTableData(data)];
            case 1:
                success = _a.sent();
                if (success != undefined && data != undefined) {
                    data.id = success;
                    return [2 /*return*/, res.status(200).json({
                            message: 'Save Route success',
                            dataSaved: data
                        })];
                }
                else {
                    return [2 /*return*/, res.status(500).json({
                            message: 'Save failed',
                            failData: data
                        })];
                }
                return [2 /*return*/];
        }
    });
}); };
var getTimetableData = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var findId, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logging_1.default.info(NAMESPACE, 'Timetable controller get table data route called.');
                // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                //     logging.error(NAMESPACE, 'Route called without body');
                //     return res.status(400).json({
                //         message: 'Request without body'
                //     });
                if (req.params.id == null) {
                    logging_1.default.error(NAMESPACE, 'Route called with invalid parameters');
                    return [2 /*return*/, res.status(400).json({
                            message: 'Invalid request'
                        })];
                }
                findId = req.params.id;
                return [4 /*yield*/, tableDataService_1.default.getTableDataByID(findId)];
            case 1:
                data = _a.sent();
                if (data != undefined) {
                    return [2 /*return*/, res.status(200).json({
                            message: 'Get Table Data success',
                            result: data
                        })];
                }
                else {
                    return [2 /*return*/, res.status(500).json({
                            message: 'Get Table Data failed'
                        })];
                }
                return [2 /*return*/];
        }
    });
}); };
var getStaticTimetableData = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var findId, staticData, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                logging_1.default.info(NAMESPACE, 'Timetable controller get table data route called.');
                // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                //     logging.error(NAMESPACE, 'Route called without body');
                //     return res.status(400).json({
                //         message: 'Request without body'
                //     });
                if (req.params.id == null) {
                    logging_1.default.error(NAMESPACE, 'Route called with invalid parameters');
                    return [2 /*return*/, res.status(400).json({
                            message: 'Invalid request'
                        })];
                }
                findId = req.params.id;
                return [4 /*yield*/, tableDataService_1.default.getStaticData(findId)];
            case 1:
                staticData = _a.sent();
                if (staticData != undefined) {
                    data = JSON.parse(String(staticData.data));
                    return [2 /*return*/, res.status(200).json({
                            message: 'Get Static Data success',
                            result: data
                        })];
                }
                else {
                    return [2 /*return*/, res.status(500).json({
                            message: 'Get Static Data failed'
                        })];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.default = { getTimetableData: getTimetableData, saveTimetableDataDynamic: saveTimetableDataDynamic, saveTimetableDataStatic: saveTimetableDataStatic, getStaticTimetableData: getStaticTimetableData };
