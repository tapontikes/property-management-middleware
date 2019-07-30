"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const properties_controller_1 = require("./controllers/properties.controller");
const user_controller_1 = require("./controllers/user.controller");
const mongoose = require("mongoose");
const config_1 = require("../utils/config");
class AppServer extends core_1.Server {
    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.setupControllers();
        this.connectDb();
    }
    setupControllers() {
        const propertiesCtrl = new properties_controller_1.PropertiesController();
        const userCtrl = new user_controller_1.UserController();
        super.addControllers([propertiesCtrl, userCtrl]);
    }
    connectDb() {
        mongoose.connect(`mongodb://${config_1.MONGO_USER}:${config_1.MONGO_PASSWORD}@${config_1.MONGO_URL}`, { useNewUrlParser: true })
            .then(() => {
            logger_1.Logger.Info('DB Connected');
        }).catch((err) => {
            logger_1.Logger.Err(err);
        });
    }
    start(port) {
        this.app.listen(port, () => {
            logger_1.Logger.Imp('Server Started: ' + port);
        });
    }
}
exports.default = AppServer;
