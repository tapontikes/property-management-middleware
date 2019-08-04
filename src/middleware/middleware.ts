import {JWKS_ALGORITHM, JWKS_AUDIENCE, JWKS_ISSUER, JWKS_URL} from '../../utils/config';
import jwt = require('express-jwt');
import jwksClient = require('jwks-rsa');
import {NextFunction} from 'express';
import {IAuth0ManagementTokenResponse, IRequest, IResponse} from '../models/models';
import request = require('request-promise');
import ResponseModel from '../models/response.model';


let managementToken;

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


function getOrRefreshManagementApiToken(req: IRequest, res: IResponse, next: NextFunction) {

   const options = {
       method: 'post',
       url: 'https://after9-properties.auth0.com/oauth/token',
       headers: {'content-type': 'application/json'},
       body: {
           client_id: 'jNosFQ66x17NoKHfhqY0vdz4iw9c5Ue2',
           client_secret: 'OuL7nitCpbkbU6v3ryC6hacRHcGR03FohgCbEgRir5UlxmXHW5knas64DPAFnHcw',
           audience: 'https://after9-properties.auth0.com/api/v2/',
           grant_type: 'client_credentials'},
       json: true,
   };

   request(options).then((response) => {
       if ( response.access_token) {
           managementToken = response.access_token;
           console.log(managementToken)
           req.token = response.access_token;
           return next();
       } else {
           return res.status(500).send(ResponseModel.internalServerError);
       }
   });

}

export {checkJwt, getOrRefreshManagementApiToken};
