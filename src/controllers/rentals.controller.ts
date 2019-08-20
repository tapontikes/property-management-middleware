import {Controller, Get, Put, Post, ClassMiddleware} from '@overnightjs/core';
import {checkJwt} from '../middleware/middleware';
import { IRequest, IResponse} from '../models/models';
import RentalsService from '../service/rentals.service';
import {Logger} from '@overnightjs/logger';
import ResponseModel from '../models/response.model';
import {IRentalDocument} from '../mongoose/rentals.model';


@Controller('api/rentals')
@ClassMiddleware([checkJwt])
export class RentalsController {

    public rentalsService = new RentalsService();


    @Get('assigned')
    private getRentalsByAssignedTenant(req: IRequest, res: IResponse) {
       // console.log(req.user)
        this.rentalsService.getRentalsByAssignedTenant(req.user.sub).then((properties: IRentalDocument[]) => {
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
        this.rentalsService.assignTenant(req.user.sub, req.params.registrationCode).then((updated: IRentalDocument) => {
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

    @Put('unassign/:id')
    private removeTenant(req: IRequest, res: IResponse) {
        if (!req.params.id) {
            return res.status(400).send(ResponseModel.paramMissingError);
        }
        this.rentalsService.unasignTenant(req.user.sub, req.params.id).then((updated) => {
            return res.json(updated);
        }).catch((err) => {
            Logger.Err(err);
            return res.status(500).send(ResponseModel.internalServerError);
        });

    }


}
