import mongoose = require('mongoose');
import {Model, Schema, Types} from 'mongoose';
import {IPropertyDocument} from '../models/models';


const propertySchema: mongoose.Schema = new mongoose.Schema({
    propertyCode: { type: String, unique: true },
    city: { type: String },
    state: { type: String },
    rent: {type: Number},
    tenants: {type: [String]},
});


const propertyModel: Model<IPropertyDocument> = mongoose.model<IPropertyDocument>('Properties', propertySchema);

export default propertyModel;
