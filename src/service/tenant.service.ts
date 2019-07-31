import {ITenant} from '../models/models';
import tenantModel from '../mongoose/tenant.model';

class TenantService {


    public createTenant(sub: string) {
        return new Promise<ITenant>((resolve, reject) => {
            // do stripe stuff
            const tenant = {sub} as ITenant;
            tenantModel.create(tenant, (doc: ITenant) => {
                resolve(doc);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public getTenants() {
        return new Promise<ITenant[]>((resolve, reject) => {
            tenantModel.find({}, (tenants: ITenant[]) => {
                resolve(tenants);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public getTenant(sub: string){
        return new Promise<ITenant>((resolve, reject) => {
            tenantModel.findOne({sub}).then((tenant) => {
                const _tenant: ITenant = tenant as ITenant;
                resolve(_tenant);
            }).catch((err) => {
                reject(err);
            });
        });
    }

}

export default TenantService;
