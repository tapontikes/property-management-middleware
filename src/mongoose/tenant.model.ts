import mongoose = require('mongoose');
import {Model, Schema, Types} from 'mongoose';
import {ITenant} from '../models/models';

const tenantSchema: mongoose.Schema = new mongoose.Schema({
    sub: { type: String, unique: true },
    stripeId: {type: String},
    subscriptions: {type: [String]},
});


const tenantModel: Model<ITenant> = mongoose.model<ITenant>('Tenant', tenantSchema);

export default  tenantModel;
