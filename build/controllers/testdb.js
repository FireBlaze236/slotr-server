"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logging_1 = __importDefault(require("../config/logging"));
var mysql_1 = require("../config/mysql");
var NAMESPACE = 'Database connection test';
var databaseGetCheck = function (req, res, next) {
    logging_1.default.info(NAMESPACE, 'Database connection check route called');
    var query = 'SELECT * FROM numbers';
    (0, mysql_1.Connect)()
        .then(function (connection) {
        (0, mysql_1.Query)(connection, query)
            .then(function (results) {
            return res.status(200).json({
                results: results
            });
        })
            .catch(function (error) {
            logging_1.default.error(NAMESPACE, error.message, error);
            return res.status(500).json({
                message: error.message,
                error: error
            });
        })
            .finally(function () {
            connection.end();
        });
    })
        .catch(function (error) {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({
            message: error.message,
            error: error
        });
    });
};
var databasePostCheck = function (req, res, next) {
    logging_1.default.info(NAMESPACE, 'Adding to database route called');
    var _a = req.body, num = _a.num, name = _a.name;
    var query = "INSERT INTO numbers VALUES(" + num + ", '" + name + "')";
    (0, mysql_1.Connect)()
        .then(function (connection) {
        (0, mysql_1.Query)(connection, query)
            .then(function (results) {
            return res.status(200).json({
                results: results
            });
        })
            .catch(function (error) {
            logging_1.default.error(NAMESPACE, error.message, error);
            return res.status(500).json({
                message: error.message,
                error: error
            });
        })
            .finally(function () {
            connection.end();
        });
    })
        .catch(function (error) {
        logging_1.default.error(NAMESPACE, error.message, error);
        return res.status(500).json({
            message: error.message,
            error: error
        });
    });
};
exports.default = { databaseGetCheck: databaseGetCheck, databasePostCheck: databasePostCheck };
