"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
let PublicController = class PublicController {
    getMessages(req, res) {
        logger_1.Logger.Info(req.params.msg);
        res.status(200).json({
            message: 'un-authed',
        });
    }
};
tslib_1.__decorate([
    core_1.Get('/'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], PublicController.prototype, "getMessages", null);
PublicController = tslib_1.__decorate([
    core_1.Controller('api/public')
], PublicController);
exports.PublicController = PublicController;
