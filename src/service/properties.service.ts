import {Logger} from '@overnightjs/logger';
import propertyModel from '../mongoose/property.model';
import {IPropertyDocument, ITenant} from '../models/models';
import TenantService from './tenant.service';

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
                if (property.tenants.find((x) => x === sub)) {
                    return resolve(0);
                }
                this.tenantService.getTenant(sub).then((tenant: ITenant) => {
                    if (tenant) {
                        propertyModel.findOneAndUpdate({propertyCode}, {$push: {tenants: tenant.sub}}, {new: true, upsert: true}, (err, doc) => {
                            if (err) {
                                return reject(err);
                            } else if (doc) {
                             return resolve(1);
                            }
                        });
                    }

                });
            });
        });
    }

}

export default PropertiesService;
