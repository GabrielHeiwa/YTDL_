import express from "express";
import http from "http";
import socket from "socket.io";
import Routes from "./routes/routes.public";
import cors from "cors";
import morgan from "morgan";

function Server() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(morgan("dev"));
    app.use(Routes());

    const server = http.createServer(app);
    
    const io = new socket.Server(server);

    return {
        app,
        io,
    };
}

export default Server();