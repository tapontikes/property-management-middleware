import AppServer from './server';

const appServer = new AppServer();
const port = Number(process.env.PORT) || 3000;
appServer.start(port);
