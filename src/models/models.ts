import {Types, Document} from 'mongoose';
import {Request, Response} from 'express';

export interface IRequest extends Request {
    user?: any;
}

export interface IResponse extends Response {
    user?: any;
}

export interface IPropertyDocument extends Document {
    address?: string;
    city?: string;
    state?: string;
    rent?: number;
    renters?: Types.Array<IPropertyRenter>;
}

export interface IPropertyRenter {
    id: string;
    rentShare: number;
}
