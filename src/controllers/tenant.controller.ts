import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import {checkJwt} from '../middleware/middleware';
import {IPropertyDocument, IRequest, IResponse, ITenant} from '../models/models';
import TenantService from '../service/tenant.service';


@Controller('api/tenant')
@ClassMiddleware([checkJwt])
export class TenantController {

    public tenantService = new TenantService();

    @Get('/')
    private getTenants(req: IRequest, res: IResponse) {

        this.tenantService.getTenants().then((tenants: ITenant[]) => {
            res.send(tenants);
        }).catch((err) => {
            res.status(400).send(err);
        });

    }

    @Get(':id')
    private getTenant(req: IRequest, res: IResponse) {
        if (!req.params.id) {
            res.status(400).send('No tenant Id.');
        }

        this.tenantService.getTenant(req.params.id).then((tenant: ITenant) => {
            res.send(tenant);
        }).catch((err) => {
            res.status(400).send(err);
        });

    }

    @Post('/create')
    private createTenant(req: IRequest, res: IResponse) {

        if (!req.params.propertyCode) {
            res.status(400).send('No property code.');
        }

        this.tenantService.createTenant(req.user.sub).then((tenant: ITenant) => {
            res.json(tenant);
        });
    }

}
