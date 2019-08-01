import {Logger} from '@overnightjs/logger';
import propertyModel from '../mongoose/property.model';
import {IPropertyDocument, ITenant} from '../models/models';
import TenantService from './tenant.service';
import {rejects} from 'assert';

class PropertiesService {

    private tenantService = new TenantService();

    public getProperties(): Promise<IPropertyDocument[]> {
        return new Promise<IPropertyDocument[]>((resolve, reject) => {
            propertyModel.find({}).then((properties: IPropertyDocument[]) => {
                resolve(properties);
            }).catch((err) => {
                Logger.Err(err);
                reject(err);
            });
        });
    }

    public insertProperty(property: IPropertyDocument) {
        return new Promise<IPropertyDocument>((resolve, reject) => {
            propertyModel.create(property).then((doc: IPropertyDocument) => {
                resolve(doc);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public assignTenant(sub: string, propertyCode: string) {
        return new Promise<number>((resolve, reject) => {
            propertyModel.findOne({propertyCode}, (error, property: IPropertyDocument) => {
                this.tenantService.createOrGetTenant(sub).then((tenant: ITenant) => {
                    if (property.tenants.find((x) => x === tenant.sub)) {
                    return resolve(0);
                }
                    propertyModel.findOneAndUpdate({propertyCode}, {$push: {tenants: tenant.sub}}, {new: true, upsert: true}).then((doc: IPropertyDocument) => {
                            if (doc) {
                             return resolve(1);
                            }
                        }).catch((err) => {
                            reject(err);
                        });
                });
            });
        });
    }

    public unasignTenant(sub: string, _id: string) {
        console.log(sub)
        console.log(_id)
        return new Promise<number>((resolve, reject) => {
            propertyModel.findOneAndUpdate({_id},  { $pull: {tenants: sub } }, (property) => {
                console.log(property)
               resolve(1);
        }).catch((err) => {
            reject(err);
            });
     });
    }

    public getPropertiesByAssignedTenant(sub: string) {
        return new Promise<IPropertyDocument[]>((resolve, reject) => {
            this.tenantService.getTenant(sub).then((tenant) => {
                if (tenant) {
                    propertyModel.find({tenants: sub}).then((properties: IPropertyDocument[]) => {
                        resolve(properties);
                    }).catch((err) => {
                        Logger.Err(err);
                        reject(err);
                    });
                } else {
                    resolve([]);
                }
            });
        });
    }

}

export default PropertiesService;
