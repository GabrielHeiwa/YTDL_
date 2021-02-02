"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = require("dotenv");
dotenv_1.config();
var URI = process.env.MONGO_ATLAS_DATABASE_URL || "";
if (URI === "")
    console.error("Impossible to catch varible env from connected database");
exports.default = mongoose_1.default.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, function (err) {
    if (err)
        console.error(err);
    console.log("Database connected with success");
});
