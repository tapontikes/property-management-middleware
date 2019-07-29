import AppServer from './server';

const appServer = new AppServer();
const nodeEnvPort: string = (process.env.NODE_ENV as string);

const port = Number(nodeEnvPort) || 3000;

appServer.start(port);
