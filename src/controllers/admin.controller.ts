import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import {checkAdmin, checkJwt} from '../middleware/middleware';
import {IRequest, IResponse} from '../models/models';
import {Logger} from '@overnightjs/logger';
import ResponseModel from '../models/response.model';
import {IRentalDocument} from '../mongoose/rentals.model';
import RentalsService from '../service/rentals.service';
import {IList} from 'stripe';
import * as Stripe from 'stripe';
import IPlanCreationOptions = Stripe.plans.IPlanCreationOptions;
import IPlan = Stripe.plans.IPlan;
import StripeService from '../service/stripe.service';
import StripeError = Stripe.errors.StripeError;
import IProductCreationOptions = Stripe.products.IProductCreationOptions;
import IProduct = Stripe.products.IProduct;
import {NextFunction} from 'express';


@Controller('api/admin')
@ClassMiddleware([checkJwt, checkAdmin])
export class AdminController {

    private rentalsService: RentalsService = new RentalsService();
    private stripeService: StripeService = new StripeService();

    // Property


    @Get('rentals')
    private getAllRentals(req: IRequest, res: IResponse) {
        this.rentalsService.getRentals().then((properties: IRentalDocument[]) => {
            res.json(properties);
        }).catch((err) => {
            Logger.Err(err);
            res.status(500).send(ResponseModel.internalServerError);
        });
    }

    @Get('rentals/:id')
    private getRentalsById(req: IRequest, res: IResponse) {
        this.rentalsService.getRentalById(req.params.id).then((properties: IRentalDocument) => {
            res.json(properties);
        }).catch((err) => {
            Logger.Err(err);
            res.status(500).send(ResponseModel.internalServerError);
        });
    }

    @Post('rentals')
    private createRental(req: IRequest, res: IResponse) {
        const rental = req.body as IRentalDocument;
        this.rentalsService.createRental(rental)
            .then((_rental: IRentalDocument) => {
                const planOptions: IPlanCreationOptions = {
                    id: _rental.id,
                    amount: (Number(_rental.rent) * 100),
                    interval: 'month',
                    currency: 'USD',
                    product: {
                        name: _rental.address,
                        id: _rental.id,
                        metadata: {
                            address: _rental.address,
                            city: _rental.city,
                            state: _rental.state,
                        },
                    },
                     metadata: {
                        address: _rental.address,
                         city: _rental.city,
                         state: _rental.state,
                    },
                };
                return this.stripeService.createStripePlan(planOptions);
            })
            .then((plan: IPlan) => {
                return res.status(200).send({db_ref: plan.id});
            }).catch((err) => {
            Logger.Err(err);
            return res.status(500).send(ResponseModel.internalServerError);
        });
    }

    @Delete('rentals/:id')
    private deleteProperty(req: IRequest, res: IResponse) {
        this.rentalsService.deleteRental(req.params.id).then(() => {
            return res.status(200).send(true);
        }).catch((err) => {
            Logger.Err(err);
            return res.status(500).send(ResponseModel.internalServerError);
        });
    }

    // Stripe

    @Post('init/product')
    public createStripeProductAndPlan(req: IRequest, res: IResponse) {
    // this.stripeService.createStripeProductAndPlan(req.user.sub, req.params.propertyId).then(())
}


    // Plan
    @Post('plan')
    public createStripePlan(req: IRequest, res: IResponse) {

    const {propertyId, amount, currency, interval, name} = req.body;

    if (!propertyId && !amount && !isNaN(amount) && !currency && !interval && !name) {
        return res.status(400).send(ResponseModel.paramMissingError);
    }

    const productPlan: IPlanCreationOptions = {
        id: propertyId,
        amount,
        interval,
        currency,
        product: {
            name,
        },
    };
    this.stripeService.createStripePlan(productPlan).then((plan: IPlan) => {
        return res.status(200).send(plan);
    }).catch((err: StripeError) =>{
        Logger.Err(err);
        return res.status(500).send(ResponseModel.internalServerError);
    });

}

    @Put('plan')
    public updateStripePlan(req: IRequest, res: IResponse) {

    // TODO Implement stripe plan update
}

    @Delete('plan')
    public deleteStripePlan(req: IRequest, res: IResponse) {

    }




}
