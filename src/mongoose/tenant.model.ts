import mongoose = require('mongoose');
import {Document, Model, Schema, Types} from 'mongoose';

export interface ITenant extends Document {
    sub: string;
    stripeId: string;
    subscriptions: [string];

}

const tenantSchema: mongoose.Schema = new mongoose.Schema({
    sub: { type: String, unique: true },
    stripeId: {type: String},
    subscriptions: {type: String},
});


const tenantModel: Model<ITenant> = mongoose.model<ITenant>('Tenant', tenantSchema);

export default  tenantModel;
