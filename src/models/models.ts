import {Types, Document, Schema} from 'mongoose';
import {Request, Response} from 'express';
import {subscriptions} from 'stripe';

export interface IRequest extends Request {
    user?: any;
}

export interface IResponse extends Response {
    user?: any;
}

export interface IPropertyDocument extends Document {
    address: string;
    city: string;
    state: string;
    rent: number;
    tenants: [string];
}

export interface ITenant extends Document {
    sub: string;
    stripeId: string;
    subscriptions: [string];

}
