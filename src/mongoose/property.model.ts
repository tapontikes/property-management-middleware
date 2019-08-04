import mongoose = require('mongoose');
import {Document, Model} from 'mongoose';

export interface IPropertyDocument extends Document {
    registrationCode: string;
    address: string;
    city: string;
    state: string;
    rent: number;
    stripeProductId: string;
    tenant: string;
}

const propertySchema: mongoose.Schema = new mongoose.Schema({
    registrationCode: { type: String, unique: true, required: true },
    address: {type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    rent: {type: Number, required: true },
    stripeProductId: {type: String, required: true },
    tenant: {type: String},
});


const propertyModel: Model<IPropertyDocument> = mongoose.model<IPropertyDocument>('Properties', propertySchema);

export default propertyModel;
