"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const middleware_1 = require("../../middleware/middleware");
let PropertiesController = class PropertiesController {
    getProperties(req, res) {
        res.status(200).json({
            message: req.body.user,
        });
    }
};
tslib_1.__decorate([
    core_1.Get('/'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], PropertiesController.prototype, "getProperties", null);
PropertiesController = tslib_1.__decorate([
    core_1.Controller('api/properties'),
    core_1.ClassMiddleware(middleware_1.checkJwt)
], PropertiesController);
exports.PropertiesController = PropertiesController;
