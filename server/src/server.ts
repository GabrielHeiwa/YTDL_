import express from "express";
import http from "http";
import socket from "socket.io";
import Routes from "./routes/routes.public";

export default function Server() {
    const app = express();
    app.use(Routes());

    const server = http.createServer(app);
    
    const io = new socket.Server(server);

    return {
        server,
        io,
    };
}