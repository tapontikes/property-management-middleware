"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const appServer = new server_1.default();
const port = Number(process.env.PORT) || 3000;
appServer.start(port);
