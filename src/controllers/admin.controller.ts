import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import {checkAdmin, checkJwt} from '../middleware/middleware';
import { IRequest, IResponse} from '../models/models';
import {Logger} from '@overnightjs/logger';
import ResponseModel from '../models/response.model';
import {IRentalDocument} from '../mongoose/rentals.model';
import RentalsService from '../service/rentals.service';


@Controller('api/admin')
@ClassMiddleware([checkJwt, checkAdmin])
export class AdminController {

    private propertyService: RentalsService = new RentalsService();

    // Property

    @Get('property/get')
    private getAllProperties(req: IRequest, res: IResponse) {
        this.propertyService.getRentals().then((properties: IRentalDocument[]) => {
            res.json(properties);
        }).catch((err) => {
            Logger.Err(err);
            res.status(500).send(ResponseModel.internalServerError);
        });
    }

    @Post('property/create')
    private createProperty(req: IRequest, res: IResponse) {
        const property = req.body as IRentalDocument;
        this.propertyService.createRental(property).then((newProperty: IRentalDocument) => {
            res.json(newProperty);
        }).catch((err) => {
            Logger.Err(err);
            res.status(500).send(ResponseModel.internalServerError);
        });
    }

    @Delete('property/delete/:id')
    private deleteProperty(req: IRequest, res: IResponse) {
        this.propertyService.deleteRental(req.params.id).then(() => {
            res.status(200).send(true);
        }).catch((err) => {
            Logger.Err(err);
            res.status(500).send(ResponseModel.internalServerError);
        });
    }

    // Stripe

}
