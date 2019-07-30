"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const user_service_1 = require("../service/user.service");
let UserController = class UserController {
    constructor() {
        this.userService = new user_service_1.default();
    }
    getProperties(req, res) {
        let token = null;
        if (req.headers.authorization) {
            token = req.headers.authorization;
        }
        this.userService.getUser(token).then((user) => {
            res.send({
                user,
            });
        });
    }
};
tslib_1.__decorate([
    core_1.Get('/'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "getProperties", null);
UserController = tslib_1.__decorate([
    core_1.Controller('api/user')
], UserController);
exports.UserController = UserController;
