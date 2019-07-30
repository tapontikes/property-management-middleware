"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
let path;
switch (process.env.NODE_ENV) {
    case 'production':
        path = `${__dirname}/../env/prod.env`;
        break;
    case 'develop':
        path = `${__dirname}/../env/dev.env`;
        break;
    default:
        path = `${__dirname}/../env/dev.env`;
}
dotenv_1.config({ path });
exports.AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || '';
exports.AUTH0_URL = process.env.AUTH0_URL || '';
exports.AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET || '';
exports.LOG_LEVEL = process.env.LOG_LEVEL || '';
exports.JWKS_URL = process.env.JWKS_URL || '';
exports.JWKS_AUDIENCE = process.env.JWKS_AUDIENCE || '';
exports.JWKS_ISSUER = process.env.JWKS_ISSUER || '';
exports.JWKS_ALGORITHM = process.env.JWKS_ALGORITHM || '';
exports.MONGO_URL = process.env.MONGO_URL || '';
exports.MONGO_USER = process.env.MONO_USER || '';
exports.MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
