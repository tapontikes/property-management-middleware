"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const config_1 = require("../../utils/config");
class UserService {
    constructor() { }
    getUser(token) {
        return new Promise((resolve, reject) => {
            const options = { method: 'POST',
                url: `${config_1.AUTH0_URL}/userinfo`,
                headers: { Authorization: token } };
            request(options, (error, response, body) => {
                if (error) {
                    throw new Error(error);
                }
                resolve(body);
            });
        });
    }
}
exports.default = UserService;
