import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import {checkJwt, stripeId} from '../middleware/middleware';
import {IRequest, IResponse} from '../models/models';
import StripeService from '../service/stripe.service';
import ResponseModel from '../models/response.model';
import * as Stripe from 'stripe';
import {IList, IStripeSource} from 'stripe';
import InvoiceItem = Stripe.invoiceItems.InvoiceItem;
import {Logger} from '@overnightjs/logger';
import IInvoice = Stripe.invoices.IInvoice;
import ISubscriptionCreationOptions = Stripe.subscriptions.ISubscriptionCreationOptions;
import ICustomer = Stripe.customers.ICustomer;
import StripeError = Stripe.errors.StripeError;
import ICustomerUpdateOptions = Stripe.customers.ICustomerUpdateOptions;
import ICustomerSourceCreationOptions = Stripe.customers.ICustomerSourceCreationOptions;



@Controller('api/stripe')
@ClassMiddleware([checkJwt, stripeId])
export class StripeController {

    private stripeService = new StripeService();


    // Customer

    @Get('customer')
    public getStripeCustomer(req: IRequest, res: IResponse) {
        this.stripeService.getCustomer(req.user.sub).then((customer: ICustomer) => {
            res.status(200).send(customer);
        }).catch((err: StripeError) => {
            Logger.Err(err);
            return res.status(500).send(ResponseModel.internalServerError);
        });
    }

    @Post('customer/source')
    public attachNewCustomerSource(req: IRequest, res: IResponse) {
        if (! req.body.source) {
            return res.status(404).send(ResponseModel.propertyNotFound);
        }

        const sourceOptions: ICustomerSourceCreationOptions = {
            source: req.body.source,
        };

        this.stripeService.attachCustomerSource(req.user.sub, sourceOptions).then((newSource: IStripeSource) =>{
            return res.status(200).send(newSource);
        }).catch((err: StripeError) => {
            Logger.Err(err);
            return res.status(500).send(err);
        });

    }


    // Invoices

    @Get('invoice')
    public getInvoicesByCustomerId(req: IRequest, res: IResponse) {
        this.stripeService.getInvoicesByCustomerId(req.user.sub).then((items: IList<InvoiceItem>) => {
            return res.status(200).send(items);
        }).catch((err) => {
            Logger.Err(err);
            return res.status(500).send(ResponseModel.internalServerError);
        });
    }

    @Get('invoice/next')
    public getNextInvoice(req: IRequest, res: IResponse) {
        this.stripeService.getNextInvoice(req.user.sub).then((invoice: IInvoice) => {
            return res.status(200).send(invoice);
        }).catch((err) => {
            Logger.Err(err);
            return res.status(500).send(ResponseModel.internalServerError);
        });

    }

    @Post('subscription')
    public createStripeSubscription(req: IRequest, res: IResponse) {
        const test = {
            customer: req.user.sub,
            default_source: req.body.source,
            // @TODO implement stripe subscription using source token from front end
        }as ISubscriptionCreationOptions;

    }

}
