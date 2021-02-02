"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var routes_public_1 = __importDefault(require("./routes/routes.public"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
function Server() {
    var app = express_1.default();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(cors_1.default());
    app.use(morgan_1.default("dev"));
    app.use(routes_public_1.default());
    var server = http_1.default.createServer(app);
    var io = new socket_io_1.default.Server(server);
    return {
        app: app,
        io: io,
    };
}
exports.default = Server();
