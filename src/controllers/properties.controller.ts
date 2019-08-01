import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import {checkJwt} from '../middleware/middleware';
import {IPropertyDocument, IRequest, IResponse} from '../models/models';
import PropertiesService from '../service/properties.service';
import {Logger} from '@overnightjs/logger';
import ResponseModel from '../models/response.model';


@Controller('api/properties')
@ClassMiddleware([checkJwt])
export class PropertiesController {

    public propertiesService = new PropertiesService();

    @Get('/')
    private getProperties(req: IRequest, res: IResponse) {
        this.propertiesService.getProperties().then((properties: IPropertyDocument[]) => {
           res.json(properties);
        }).catch((err) => {
           Logger.Err(err);
           res.status(500).send(ResponseModel.internalServerError);
});

}

    @Get('assigned')
    private getPropertiesByAssignedTenant(req: IRequest, res: IResponse) {
        this.propertiesService.getPropertiesByAssignedTenant(req.user.sub).then((properties: IPropertyDocument[]) => {
            res.json(properties);
        }).catch((err) => {
            Logger.Err(err);
            res.status(500).send(ResponseModel.internalServerError);
        });

    }


    @Post('assign/:propertyCode')
    private assignTenant(req: IRequest, res: IResponse) {
        if (!req.params.propertyCode) {
            res.status(400).send(ResponseModel.paramMissingError);
        }
        this.propertiesService.assignTenant(req.user.sub, req.params.propertyCode).then((updated: number) => {
           res.json(updated);
        }).catch((err) => {
            Logger.Err(err);
            res.status(500).send(ResponseModel.internalServerError);
        });

    }

    @Delete('unassign/:id')
    private unassignTenant(req: IRequest, res: IResponse) {
        if (!req.params.id) {
            res.status(400).send(ResponseModel.paramMissingError);
        }
        this.propertiesService.unasignTenant(req.user.sub, req.params.id).then((updated) => {
            res.json(updated);
        }).catch((err) => {
            Logger.Err(err);
            res.status(500).send(ResponseModel.internalServerError);
        });

    }


}
