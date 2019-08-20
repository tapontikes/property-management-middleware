import {JWKS_ALGORITHM, JWKS_AUDIENCE, JWKS_ISSUER, JWKS_URL} from '../../utils/config';
import jwksClient = require('jwks-rsa');
import {NextFunction} from 'express';
import {IRequest, IResponse} from '../models/models';
import jwt = require('express-jwt');


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


function checkAdmin(req: IRequest, res: IResponse, next: NextFunction) {
    if (!req.user['https://after9-properties.com/app_metadata'].admin) {
        res.status(401).send('Unauthorized');
    } else {
        next();
    }
}

function stripeId(req: IRequest, res: IResponse, next: NextFunction) {
    req.user.sub = (req.user.sub).replace('|', '_');
    next();
}


export {checkJwt, checkAdmin, stripeId};
