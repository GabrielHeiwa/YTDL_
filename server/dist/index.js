"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server"));
var dotenv_1 = require("dotenv");
dotenv_1.config();
var PORT = process.env.PORT || 3333;
server_1.default.app.listen(PORT, function () { return console.log("> Server runnning in http://localhost:" + PORT); });
