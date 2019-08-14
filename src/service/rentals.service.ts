import {Logger} from '@overnightjs/logger';
import rentalsModel, {IRentalDocument} from '../mongoose/rentals.model';
import {IProduct} from '../models/models';


class RentalsService {

    public getRentals(): Promise<IRentalDocument[]> {
        return new Promise<IRentalDocument[]>((resolve, reject) => {
            rentalsModel.find({}).exec().then((properties: IRentalDocument[]) => {
                resolve(properties);
            }).catch((err) => {
                Logger.Err(err);
                reject(err);
            });
        });
    }

    public getRentalsByAssignedTenant(sub: string) {
        return new Promise<IRentalDocument[]>((resolve, reject) => {
                    rentalsModel.find({tenant: sub}).exec().then((properties: IRentalDocument[]) => {
                        resolve(properties);
                    }).catch((err) => {
                        Logger.Err(err);
                        reject(err);
                });
        });
    }

    public getRentalById(_id: string) {
        return new Promise<IRentalDocument>((resolve, reject) => {
            rentalsModel.findOne({_id}).exec().then((property) => {
                // @ts-ignore
                resolve(property);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }


    public createRental(property: IRentalDocument) {
        return new Promise<IRentalDocument>((resolve, reject) => {
            rentalsModel.create(property).then((newProperty: IRentalDocument) => {
                resolve(newProperty);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public deleteRental(_id: string) {
        return new Promise<any>((resolve, reject) => {
            rentalsModel.findOneAndDelete({_id})
                .exec()
                .then((deletedProperty) => {
                    if (deletedProperty) {
                       resolve();
                    } else {
                        reject();
                    }
                }).catch((err: any) => {
                    reject(err);
            });
        });
    }

    public assignTenant(sub: string, registrationCode: string) {
        return new Promise<IRentalDocument>((resolve, reject) => {
                return rentalsModel.findOneAndUpdate({registrationCode}, {tenant: sub}, {
                    new: true, upsert: true})
                    .exec()
                    .then((doc: IRentalDocument) => {
                        resolve(doc);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    public unasignTenant(sub: string, _id: string) {
        return new Promise<number>((resolve, reject) => {
            rentalsModel.findOneAndUpdate({_id}, {$pull: {tenant: sub}})
                .exec()
                .then( () => {
                resolve(1);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

}

export default RentalsService;
