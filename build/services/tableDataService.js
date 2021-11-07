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
var typeorm_1 = require("typeorm");
var Timetable_1 = require("../entity/Timetable");
var logging_1 = __importDefault(require("../config/logging"));
var Rowtable_1 = require("../entity/Rowtable");
var Coltable_1 = require("../entity/Coltable");
var Slottable_1 = require("../entity/Slottable");
var StaticData_1 = require("../entity/StaticData");
var NAMESPACE = 'Timetable Service';
//TYPE ORM LOGGERS
var orm_error_flag = false;
var orm_error_log = function (error) {
    logging_1.default.error(NAMESPACE, error.message, error);
    orm_error_flag = true;
};
var check_orm_errors = function () {
    var val = orm_error_flag;
    orm_error_flag = false;
    return val;
};
var syncStaticAndDynamic = function () { return __awaiter(void 0, void 0, void 0, function () {
    var staticData, i, backupData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, typeorm_1.getRepository)(StaticData_1.StaticData).find()];
            case 1:
                staticData = _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < staticData.length)) return [3 /*break*/, 5];
                backupData = JSON.parse(String(staticData[i].data));
                return [4 /*yield*/, saveTableData(backupData)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}); };
var saveStaticTableData = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var backup;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (data == undefined || data.id == undefined) {
                    logging_1.default.error(NAMESPACE, 'Static save data invalid(requires id)');
                    return [2 /*return*/, undefined];
                }
                backup = new StaticData_1.StaticData();
                backup.id = data.id;
                backup.data = JSON.stringify(data);
                return [4 /*yield*/, (0, typeorm_1.getRepository)(StaticData_1.StaticData).save(backup)];
            case 1:
                _a.sent();
                return [2 /*return*/, saveTableData(data)];
        }
    });
}); };
var saveTableData = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var newTimetable, entryId, i, rowData, i, colData, i, slotData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (data == undefined) {
                    logging_1.default.error(NAMESPACE, 'Save table data not provided', data);
                    return [2 /*return*/, undefined];
                }
                newTimetable = new Timetable_1.Timetable();
                newTimetable.id = data.id;
                newTimetable.name = data.name;
                newTimetable.numrows = data.numrows;
                newTimetable.numcols = data.numcols;
                return [4 /*yield*/, (0, typeorm_1.getRepository)(Timetable_1.Timetable).save(newTimetable).catch(orm_error_log)];
            case 1:
                _a.sent();
                if (check_orm_errors()) {
                    logging_1.default.error(NAMESPACE, 'Unable to save data to database', data);
                    return [2 /*return*/, undefined];
                }
                entryId = newTimetable.id;
                //TODO : ADD error checking
                //TODO : Make this transactional
                //Delete rows from before
                return [4 /*yield*/, (0, typeorm_1.getRepository)(Rowtable_1.Rowtable).delete({ timetable: newTimetable })];
            case 2:
                //TODO : ADD error checking
                //TODO : Make this transactional
                //Delete rows from before
                _a.sent();
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < data.rows.length)) return [3 /*break*/, 6];
                rowData = new Rowtable_1.Rowtable();
                rowData.name = data.rows[i];
                rowData.timetable = newTimetable;
                return [4 /*yield*/, (0, typeorm_1.getRepository)(Rowtable_1.Rowtable).save(rowData)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6: 
            //Delete cols from before
            return [4 /*yield*/, (0, typeorm_1.getRepository)(Coltable_1.Coltable).delete({ timetable: newTimetable })];
            case 7:
                //Delete cols from before
                _a.sent();
                i = 0;
                _a.label = 8;
            case 8:
                if (!(i < data.cols.length)) return [3 /*break*/, 11];
                colData = new Coltable_1.Coltable();
                colData.start = data.cols[i].start;
                colData.end = data.cols[i].end;
                colData.timetable = newTimetable;
                return [4 /*yield*/, (0, typeorm_1.getRepository)(Coltable_1.Coltable).save(colData)];
            case 9:
                _a.sent();
                _a.label = 10;
            case 10:
                i++;
                return [3 /*break*/, 8];
            case 11: 
            //Delete slots from before
            return [4 /*yield*/, (0, typeorm_1.getRepository)(Slottable_1.Slottable).delete({ timetable: newTimetable })];
            case 12:
                //Delete slots from before
                _a.sent();
                i = 0;
                _a.label = 13;
            case 13:
                if (!(i < data.slots.length)) return [3 /*break*/, 16];
                slotData = new Slottable_1.Slottable();
                slotData.title = data.slots[i].title;
                slotData.row = data.slots[i].row;
                slotData.col = data.slots[i].col;
                slotData.timetable = newTimetable;
                return [4 /*yield*/, (0, typeorm_1.getRepository)(Slottable_1.Slottable).save(slotData)];
            case 14:
                _a.sent();
                _a.label = 15;
            case 15:
                i++;
                return [3 /*break*/, 13];
            case 16: return [2 /*return*/, entryId];
        }
    });
}); };
var getTableDataByID = function (searchId) { return __awaiter(void 0, void 0, void 0, function () {
    var timetableData, rowData, colData, slotData, parsedData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (searchId == undefined) {
                    logging_1.default.error(NAMESPACE, 'Get table data id type mismatch', searchId);
                    return [2 /*return*/, undefined];
                }
                return [4 /*yield*/, (0, typeorm_1.getRepository)(Timetable_1.Timetable).findOne({ where: { id: searchId } })];
            case 1:
                timetableData = _a.sent();
                if (timetableData == undefined) {
                    logging_1.default.error(NAMESPACE, 'Get table data id mismatch', searchId);
                    return [2 /*return*/, undefined];
                }
                return [4 /*yield*/, (0, typeorm_1.getRepository)(Rowtable_1.Rowtable).find({ where: { timetable: timetableData } })];
            case 2:
                rowData = _a.sent();
                return [4 /*yield*/, (0, typeorm_1.getRepository)(Coltable_1.Coltable).find({ where: { timetable: timetableData } })];
            case 3:
                colData = _a.sent();
                return [4 /*yield*/, (0, typeorm_1.getRepository)(Slottable_1.Slottable).find({ where: { timetable: timetableData } })];
            case 4:
                slotData = _a.sent();
                parsedData = {
                    id: timetableData.id,
                    name: timetableData.name,
                    numrows: timetableData.numrows,
                    numcols: timetableData.numcols,
                    rows: getRowNames(rowData),
                    cols: getColArray(colData),
                    slots: getSlotArray(slotData)
                };
                return [2 /*return*/, parsedData];
        }
    });
}); };
var getRowNames = function (rowData) {
    var arr = [];
    for (var i = 0; i < rowData.length; i++) {
        arr.push(rowData[i].name);
    }
    return arr;
};
var getColArray = function (colData) {
    var arr = [];
    for (var i = 0; i < colData.length; i++) {
        var obj = {
            start: colData[i].start,
            end: colData[i].end
        };
        arr.push(obj);
    }
    return arr;
};
var getSlotArray = function (slotData) {
    var arr = [];
    for (var i = 0; i < slotData.length; i++) {
        var obj = {
            title: slotData[i].title,
            row: slotData[i].row,
            col: slotData[i].col
        };
        arr.push(obj);
    }
    return arr;
};
var getStaticData = function (searchId) { return __awaiter(void 0, void 0, void 0, function () {
    var timetableData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (searchId == undefined) {
                    logging_1.default.error(NAMESPACE, 'Get static data id type mismatch', searchId);
                    return [2 /*return*/, undefined];
                }
                return [4 /*yield*/, (0, typeorm_1.getRepository)(StaticData_1.StaticData).findOne({ where: { id: searchId } })];
            case 1:
                timetableData = _a.sent();
                if (timetableData == undefined) {
                    logging_1.default.error(NAMESPACE, 'Get statuc data id mismatch', searchId);
                    return [2 /*return*/, undefined];
                }
                return [2 /*return*/, timetableData];
        }
    });
}); };
exports.default = { saveTableData: saveTableData, getTableDataByID: getTableDataByID, saveStaticTableData: saveStaticTableData, syncStaticAndDynamic: syncStaticAndDynamic, getStaticData: getStaticData };
