"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const appServer = new server_1.default();
appServer.start(3000);
