import * as bodyParser from 'body-parser';
import { PrivateController } from './controllers/privateController';
import { PublicController } from './controllers/publicController';
import {Server} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';

class AppServer extends Server {

    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
    }


    private setupControllers(): void {
        const privateController = new PrivateController();
        const publicController = new PublicController();
        super.addControllers([privateController, publicController]);
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp('Server Started: ' + port);
        });
    }



}

export default AppServer;
