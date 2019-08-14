import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import {checkJwt} from '../middleware/middleware';
import { IRequest, IResponse} from '../models/models';
import RentalsService from '../service/rentals.service';
import {Logger} from '@overnightjs/logger';
import ResponseModel from '../models/response.model';
import {IRentalDocument} from '../mongoose/rentals.model';


@Controller('api/rentals')
@ClassMiddleware([checkJwt])
export class RentalsController {

    public propertiesService = new RentalsService();

    @Get('/assigned/all')
    private getProperties(req: IRequest, res: IResponse) {
        this.propertiesService.getRentals().then((properties: IRentalDocument[]) => {
           res.json(properties);
        }).catch((err) => {
           Logger.Err(err);
           res.status(500).send(ResponseModel.internalServerError);
});

}

    @Get('assigned')
    private getPropertiesByAssignedTenant(req: IRequest, res: IResponse) {
       // console.log(req.user)
        this.propertiesService.getRentalsByAssignedTenant(req.user.sub).then((properties: IRentalDocument[]) => {
            res.json(properties);
        }).catch((err) => {
            Logger.Err(err);
            res.status(500).send(ResponseModel.internalServerError);
        });

    }


    @Post('assign/:registrationCode')
    private assignTenant(req: IRequest, res: IResponse) {
        if (!req.params.registrationCode) {
            return res.status(400).send(ResponseModel.paramMissingError);
        }
        this.propertiesService.assignTenant(req.user.sub, req.params.registrationCode).then((updated: IRentalDocument) => {
           return res.json(updated);
        }).catch((err: any) => {
            if (err === 404) {
                return res.status(404).send(ResponseModel.propertyNotFound);
            } else {
                Logger.Err(err);
                return res.status(500).send(ResponseModel.internalServerError);
            }
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
