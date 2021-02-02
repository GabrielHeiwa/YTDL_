"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var dotenv_1 = require("dotenv");
dotenv_1.config();
exports.default = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID_HEIWA,
    region: process.env.AWS_DEFAULT_REGION_HEIWA,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_HEIWA,
});
