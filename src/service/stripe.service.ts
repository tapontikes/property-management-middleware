import {IProduct} from '../models/models';
import {STRIPE_API_SECRET} from '../../utils/config';
import * as Stripe from 'stripe';
import {IDeleteConfirmation} from 'stripe';


class StripeService {

    private stripeService = new Stripe(STRIPE_API_SECRET);


    // Customer

    public createCustomer() {
        return new Promise<number>((resolve, reject) => {
            this.stripeService.customers.create({
                description: 'Rental Customer',
                source: "tok_mastercard" // obtained with Stripe.js
            }, function(err, customer) {
                // asynchronously called
            });
        });
    }

    // Products

    public createProduct(propertyAddress: string, propertyId: string, rent: number) {
        return new Promise<IProduct>((resolve, reject) => {
            this.stripeService.products.create({
                name: propertyAddress,
                type: 'service',
                metadata: {
                    propertyId,
                    rent,
                },
            }).then((product: IProduct) => {
                resolve(product);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public deleteProduct(productId: string) {
        return new Promise((resolve, reject) => {
            this.stripeService.products.del(productId).then((conformation: IDeleteConfirmation) => {
                if (conformation.deleted) {
                    resolve();
                } else {
                    reject(conformation.id);
                }
            });
        });
    }


    // Subscriptions



    }
export default StripeService;
