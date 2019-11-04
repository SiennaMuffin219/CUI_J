import express from 'express'
import {listen} from 'socket.io'
import {createServer} from "http";
import {EventSources, Logger} from "./shared/Logger";
import {Server} from "net";
import connections from './shared/config/connections.json'
const app = express();

const httpServer = createServer(app);

const io = listen(httpServer);

const logger = new Logger("");


const tcpServer = new Server();
tcpServer.listen(connections["socket-tcp"].port)

tcpServer.on('connection', socket => {
   socket.on('data', data => {
       
   })
});



io.on("connection", socket => {
    logger.connection(socket, true);


    socket.on('disconnect', () => {
        logger.connection(socket, false)
    });

    socket.on("test", (message) => {
        logger.event("test", EventSources.CLIENT, message);
    })
});



httpServer.listen(connections["socket-front"].port, () => {
    console.clear();
    logger.log("Server is listening on port " + connections["socket-front"].port);
});