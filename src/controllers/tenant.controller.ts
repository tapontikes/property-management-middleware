import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import {checkJwt} from '../middleware/middleware';
import {IPropertyDocument, IRequest, IResponse, ITenant} from '../models/models';
import TenantService from '../service/tenant.service';
import ResponseModel from '../models/response.model';
import {Logger} from '@overnightjs/logger';


@Controller('api/tenant')
@ClassMiddleware([checkJwt])
export class TenantController {

    public tenantService = new TenantService();

    @Get('/')
    private getTenants(req: IRequest, res: IResponse) {

        this.tenantService.getTenants().then((tenants: ITenant[]) => {
            res.send(tenants);
        }).catch((err) => {
            Logger.Err(err);
            res.status(500).send(ResponseModel.internalServerError);
        });

    }

    @Get(':id')
    private getTenant(req: IRequest, res: IResponse) {
        if (!req.params.id) {
            res.status(400).send(ResponseModel.paramMissingError);
        }
        this.tenantService.getTenant(req.params.id).then((tenant: ITenant) => {
            res.send(tenant);
        }).catch((err) => {
            Logger.Err(err);
            res.status(400).send(ResponseModel.internalServerError);
        });

    }

/*
    @Post('/create')
    private createTenant(req: IRequest, res: IResponse) {
        this.tenantService.createTenant(req.user.sub).then((tenant: ITenant) => {
            res.status(200).end();
        }).catch((err) => {
            Logger.Err(err);
            res.status(500.).send(ResponseModel.internalServerError);
        });
    }

 */

}
