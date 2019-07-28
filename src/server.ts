import * as bodyParser from 'body-parser';
import {Server} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import {PropertiesController} from './controllers/properties/properties.controller';
import {checkJwt} from './middleware/middleware';


class AppServer extends Server {


    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
    }


    private setupControllers(): void {
        // const privateController = new PrivateController();
        // const publicController = new PublicController();
        // const authController = new AuthController();
        const propertiesCtrl = new PropertiesController();
        super.addControllers([propertiesCtrl]);
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp('Server Started: ' + port);
        });
    }


}

export default AppServer;
