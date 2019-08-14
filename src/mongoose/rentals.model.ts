import mongoose = require('mongoose');
import {Document, Model} from 'mongoose';

export interface IRentalDocument extends Document {
    registrationCode: string;
    address: string;
    city: string;
    state: string;
    rent: number;
    stripeProductId: string;
    tenant: string;
}

const rentalSchema: mongoose.Schema = new mongoose.Schema({
    registrationCode: { type: String, unique: true, required: true },
    address: {type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    rent: {type: Number, required: true },
    stripeProductId: {type: String },
    tenant: {type: String},
});


const rentalsModel: Model<IRentalDocument> = mongoose.model<IRentalDocument>('Rentals', rentalSchema);

export default rentalsModel;
