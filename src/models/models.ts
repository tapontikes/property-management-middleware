import {Request, Response} from 'express';
import Stripe = require('stripe');

export interface IRequest extends Request {
    user?: any;
    token?: any;
}

export interface IResponse extends Response {
    user?: any;
}

export interface IProduct extends Stripe.products.IProduct {
    id: any;
}

export interface IAuth0ManagementTokenResponse {
    access_token: string;
    scope: string;
    expires_in: number;
    token_type: string;
}

export interface IManagementApiToken {
    iss: string;
    sub: string;
    aud: string;
    iat: number;
    exp: number;
    azp: string;
    scope: string;
    gty: string;
}
