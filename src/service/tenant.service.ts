import {ITenant} from '../models/models';
import tenantModel from '../mongoose/tenant.model';
import {MongoError} from 'mongodb';

class TenantService {

    public getTenants() {
        return new Promise<ITenant[]>((resolve, reject) => {
            tenantModel.find({}, (tenants: ITenant[]) => {
                resolve(tenants);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public getTenant(sub: string) {
        return new Promise<ITenant>((resolve, reject) => {
            tenantModel.findOne({sub}).then((tenant) => {
                const _tenant: ITenant = tenant as ITenant;
                resolve(_tenant);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public createOrGetTenant(sub: string) {
        return new Promise<ITenant>((resolve, reject) => {
            const tenant = {sub} as ITenant;
            tenantModel.create(tenant).then((doc: ITenant) => {
                resolve(doc);
            }).catch((err: MongoError) => {
                if (err.code === 11000) {
                    this.getTenant(sub).then((newTenant: ITenant) => { resolve (newTenant); });
                } else {
                    reject(err);
                }
            });
        });
    }

}

export default TenantService;
