"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const properties_controller_1 = require("./controllers/properties/properties.controller");
class AppServer extends core_1.Server {
    constructor() {
        super(true);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.setupControllers();
    }
    setupControllers() {
        const propertiesCtrl = new properties_controller_1.PropertiesController();
        super.addControllers([propertiesCtrl]);
    }
    start(port) {
        this.app.listen(port, () => {
            logger_1.Logger.Imp('Server Started: ' + port);
        });
    }
}
exports.default = AppServer;
