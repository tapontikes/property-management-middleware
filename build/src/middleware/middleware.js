"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../utils/config");
const jwt = require("express-jwt");
const jwksClient = require("jwks-rsa");
const checkJwt = jwt({
    secret: jwksClient.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: config_1.JWKS_URL,
    }),
    session: false,
    requestProperty: 'body.user',
    audience: config_1.JWKS_AUDIENCE,
    issuer: config_1.JWKS_ISSUER,
    algorithms: [config_1.JWKS_ALGORITHM],
}).unless({ path: ['/public'] });
exports.checkJwt = checkJwt;
