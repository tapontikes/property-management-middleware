import {JWKS_ALGORITHM, JWKS_AUDIENCE, JWKS_ISSUER, JWKS_URL} from '../../utils/config';
import jwt = require('express-jwt');
import jwksClient = require('jwks-rsa');


const checkJwt = jwt({
        secret: jwksClient.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 10,
            jwksUri: JWKS_URL,
        }),
        session: false,
        audience: JWKS_AUDIENCE,
        issuer: JWKS_ISSUER,
        algorithms: [JWKS_ALGORITHM],

    }).unless({path: ['/public']});


export {checkJwt};
