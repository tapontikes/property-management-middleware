import {IProduct} from '../models/models';
import {STRIPE_API_SECRET} from '../../utils/config';
import * as Stripe from 'stripe';
import {ICard, IDeleteConfirmation, IList, IStripeSource} from 'stripe';
import IPlan = Stripe.plans.IPlan;
import StripeError = Stripe.errors.StripeError;
import IPlanCreationOptions = Stripe.plans.IPlanCreationOptions;
import IInvoiceListLineItemsOptions = Stripe.invoices.IInvoiceListLineItemsOptions;
import InvoiceItem = Stripe.invoiceItems.InvoiceItem;
import IInvoice = Stripe.invoices.IInvoice;
import IProductCreationOptions = Stripe.products.IProductCreationOptions;
import ISubscriptionCreationOptions = Stripe.subscriptions.ISubscriptionCreationOptions;
import ISubscription = Stripe.subscriptions.ISubscription;
import ICustomerUpdateOptions = Stripe.customers.ICustomerUpdateOptions;
import ICustomer = Stripe.customers.ICustomer;
import ICustomerCardSourceCreationOptions = Stripe.customers.ICustomerCardSourceCreationOptions;
import ICustomerSourceCreationOptions = Stripe.customers.ICustomerSourceCreationOptions;
import UserService from './user.service';


class StripeService {

    private stripeService = new Stripe(STRIPE_API_SECRET);
    private userService = new UserService();


    // Customer

    public createStripeCustomer() {
        return new Promise<number>((resolve, reject) => {
            this.stripeService.customers.create({
                description: 'Rental Customer',
                source: 'tok_mastercard', // obtained with Stripe.js
            }, function(err, customer) {
                // asynchronously called
            });
        });
    }

    public getCustomer(sub: string) {
        return new Promise<ICustomer>((resolve, reject) => {
            this.stripeService.customers.retrieve(sub).then((customer: ICustomer) => {
                resolve(customer);
            }).catch((err: StripeError) => {
                reject(err);
            });
        });
    }

    public updateCustomer(sub: string, customerOptions: ICustomerUpdateOptions) {
        return new Promise<ICustomer>((resolve, reject) => {
            this.stripeService.customers.update(sub, customerOptions).then((customer: ICustomer) => {
                resolve(customer);
            }).catch((err: StripeError) => {
                reject(err);
            });
        });
    }

    public attachCustomerSource(sub: string, sourceOptions: ICustomerSourceCreationOptions) {
        return new Promise<IStripeSource>((resolve, reject) => {
            this.stripeService.customers.createSource(sub, sourceOptions).then((source: IStripeSource) => {
                resolve(source);
            }).catch((err: StripeError) => {
                reject(err);
            });
        });
    }

    // Products

    public createStripeProduct(productOptions: IProductCreationOptions) {
        return new Promise<IProduct>((resolve, reject) => {
            this.stripeService.products.create(productOptions)
                .then((product: IProduct) => {
                    resolve(product);
                }).catch((err: StripeError) => {
                reject(err);
            });
        });
    }


    public deleteStripeProduct(productId: string) {
        return new Promise<IDeleteConfirmation>((resolve, reject) => {
            this.stripeService.products.del(productId).then((conformation: IDeleteConfirmation) => {
                if (conformation.deleted) {
                    resolve();
                } else {
                    reject(conformation.id);
                }
            }).catch((err: StripeError) => {
                reject(err);
            });
        });
    }

    // Plan

    public createStripePlan(planOptions: IPlanCreationOptions) {
        return new Promise<IPlan>((resolve, reject) => {
            this.stripeService.plans.create(planOptions)
                .then((plan: IPlan) => {
                    resolve(plan);
                }).catch((err: StripeError) => {
                reject(err);
            });
        });
    }


    // Subscriptions


    public createStripeSubscription(subscription: ISubscriptionCreationOptions) {
        return new Promise<ISubscription>((resolve, reject) => {
            this.stripeService.subscriptions.create(subscription).then((newSubscription: ISubscription) => {
                 resolve(newSubscription);
            }).catch((err: StripeError) => {
                reject(err);
            });
        });
    }


    // Invoices

    public getInvoicesByCustomerId(invoiceOptions: IInvoiceListLineItemsOptions) {
        return new Promise<IList<InvoiceItem>>((resolve, reject) => {
            this.stripeService.invoiceItems.list(invoiceOptions).then((items: IList<InvoiceItem>) => {
                resolve(items);
            }).catch((err: StripeError) => {
                reject(err);
            });
        });
    }

    public getNextInvoice(customer: string) {
        return new Promise<IInvoice>((resolve, reject) => {
            this.stripeService.invoices.retrieveUpcoming({customer}).then((invoice: IInvoice) => {
                resolve(invoice);
            }).catch((err: StripeError) => {
                reject(err);
            });
        });
    }


    public static stripeId(id: string): string {
        return id.replace('|', '_');
    }

}

export default StripeService;
