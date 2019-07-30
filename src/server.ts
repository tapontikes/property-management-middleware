import * as bodyParser from 'body-parser';
import {Server} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import {PropertiesController} from './controllers/properties.controller';
import {UserController} from './controllers/user.controller';
import mongoose = require('mongoose');
import {MONGO_PASSWORD, MONGO_URL, MONGO_USER} from '../utils/config';

class AppServer extends Server {


    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.setupControllers();
        this.connectDb();
    }


    private setupControllers(): void {
        const propertiesCtrl = new PropertiesController();
        const userCtrl = new UserController();
        super.addControllers([propertiesCtrl, userCtrl]);
    }
    public connectDb(): void {
        mongoose.Promise = Promise;
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}`, {useNewUrlParser: true})
            .then(() => {
            Logger.Info('DB Connected');
        }).catch((err) => {
            Logger.Err(err);
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => {

            Logger.Imp('Server Started: ' + port);
        });
    }


}

export default AppServer;
