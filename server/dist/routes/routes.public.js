"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var convertCotnroller_1 = __importDefault(require("../controller/convertCotnroller"));
function Routes() {
    var routes = express_1.Router();
    routes.get("/", function (req, res) {
        res.send("hello world");
    });
    routes.post("/convert", convertCotnroller_1.default.convertYoutubeURL);
    return routes;
}
exports.default = Routes;
