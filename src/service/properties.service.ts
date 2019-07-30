import {Logger} from '@overnightjs/logger';
import propertyModel from '../mongoose/property.model';
import {IPropertyDocument} from '../models/models';

class PropertiesService {

    constructor() {
    }

    public getProperties(): Promise<IPropertyDocument[]> {
        return new Promise((resolve, reject) => {
            propertyModel.find({}).then((properties: IPropertyDocument[]) => {
                resolve(properties);
            }).catch((err) => {
                Logger.Err(err);
                reject(err);
            });
        });
    }

    public insertProperty(property: IPropertyDocument) {
        return new Promise((resolve, reject) => {
            propertyModel.create(property).then((doc: IPropertyDocument) => {
                resolve(doc);
            }).catch((err) => {
                reject(err);
            });
        });
    }

}

export default PropertiesService;
