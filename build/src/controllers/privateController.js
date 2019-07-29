"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
let PrivateController = class PrivateController {
    getMessages(req, res) {
        logger_1.Logger.Info(req.params.msg);
        res.status(200).json({
            message: 'authed',
        });
    }
};
tslib_1.__decorate([
    core_1.Get('/'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], PrivateController.prototype, "getMessages", null);
PrivateController = tslib_1.__decorate([
    core_1.Controller('api/protected')
], PrivateController);
exports.PrivateController = PrivateController;
