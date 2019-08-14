import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import {checkJwt} from '../middleware/middleware';
import {IRequest, IResponse} from '../models/models';
import * as Stripe from '../service/stripe.service';
import {STRIPE_API_SECRET} from '../../utils/config';
import StripeService from '../service/stripe.service';



@Controller('api/stripe')
@ClassMiddleware([checkJwt])
export class StripeController {

    private stripeService = new StripeService();

    @Post('init/product')
    public createStripeProductAndPlan(req: IRequest, res: IResponse){
        //this.stripeService.createStripeProductAndPlan(req.user.sub, req.params.propertyId).then(())
    }

}
