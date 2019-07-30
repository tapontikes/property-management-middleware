import mongoose = require('mongoose');
import {Model} from 'mongoose';
import {IPropertyDocument} from '../models/models';


const propertySchema: mongoose.Schema = new mongoose.Schema({
    code: { type: String, unique: true },
    city: { type: String },
    state: { type: String },
    rent: {type: Number},
    renters: {type: mongoose.Schema.Types.Array},
});


const propertyModel: Model<IPropertyDocument> = mongoose.model<IPropertyDocument>('Properties', propertySchema);

export default  propertyModel;
