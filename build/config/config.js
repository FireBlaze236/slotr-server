"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
var MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'test';
var MYSQL_USER = process.env.MYSQL_DATABASE || 'root';
var MYSQL_PASSWORD = process.env.MYSQL_DATABASE || 'password';
var SERVER_PORT = process.env.SERVER_PORT || 1337;
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
var MYSQL = {
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD
};
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
var config = {
    server: SERVER,
    mysql: MYSQL
};
exports.default = config;
