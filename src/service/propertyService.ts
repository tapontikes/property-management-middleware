import {Logger} from '@overnightjs/logger';
import propertyModel, {IPropertyDocument} from '../mongoose/property.model';
import StripeService from './stripe.service';
import {IProduct} from '../models/models';


class PropertyService {

    private stripeService: StripeService = new StripeService();


    public getProperties(): Promise<IPropertyDocument[]> {
        return new Promise<IPropertyDocument[]>((resolve, reject) => {
            propertyModel.find({}).exec().then((properties: IPropertyDocument[]) => {
                resolve(properties);
            }).catch((err) => {
                Logger.Err(err);
                reject(err);
            });
        });
    }

    public getPropertiesByAssignedTenant(sub: string) {
        return new Promise<IPropertyDocument[]>((resolve, reject) => {
                    propertyModel.find({tenant: sub}).exec().then((properties: IPropertyDocument[]) => {
                        resolve(properties);
                    }).catch((err) => {
                        Logger.Err(err);
                        reject(err);
                });
        });
    }

    public getPropertyById(_id: string) {
        return new Promise<IPropertyDocument>((resolve, reject) => {
            propertyModel.findOne({_id}).exec().then((property) =>{
                // @ts-ignore
                resolve(property);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }


    public createProperty(property: IPropertyDocument) {
        return new Promise<IPropertyDocument>((resolve, reject) => {
            this.stripeService.createProduct(property).then((product: IProduct) => {
                property.stripeProductId = product.id;
                return property;
            }).then((propertyWithProduct: IPropertyDocument) => {
                return propertyModel.create(propertyWithProduct).catch((err) => {reject(err)});
            }).then((newProperty) => {
                newProperty = newProperty as IPropertyDocument;
                resolve(newProperty);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public assignTenant(sub: string, propertyCode: string) {
        return new Promise<IPropertyDocument>((resolve, reject) => {
                return propertyModel.findOneAndUpdate({propertyCode}, {tenant: sub}, {
                    new: true, upsert: true})
                    .exec()
                    .then((doc: IPropertyDocument) => {
                        resolve(doc);
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    public unasignTenant(sub: string, _id: string) {
        return new Promise<number>((resolve, reject) => {
            propertyModel.findOneAndUpdate({_id}, {$pull: {tenant: sub}})
                .exec()
                .then( () => {
                resolve(1);
            }).catch((err: any) => {
                reject(err);
            });
        });
    }

}

export default PropertyService;
