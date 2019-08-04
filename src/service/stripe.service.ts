import {IProduct, IRequest, IResponse} from '../models/models';
import {STRIPE_API_SECRET} from '../../utils/config';
import {IPropertyDocument} from '../mongoose/property.model';
import * as Stripe from 'stripe';
import PropertyService from './propertyService';


class StripeService {

    private stripeService = new Stripe(STRIPE_API_SECRET);


    public createProduct(property: IPropertyDocument) {
        return new Promise<IProduct>((resolve, reject) => {
            this.stripeService.products.create({
                name: property.address,
                type: 'service',
                metadata: {
                    propertyId: property._id,
                    rent: property.rent,
                },
            }).then((product: IProduct) => {
                resolve(product);
            }).catch((err) =>{
                reject(err);
            });
        });
    }


    public createCustomer() {
        return new Promise<number>((resolve, reject) => {


        });
    }

        /*
        public updateSubscriptionEndDate(sub: string){
            return new Promise((resolve, reject) => {
                this.stripeService.subscriptions.update(
                    sub, {}

            });
        }
        */

    }
export default StripeService;
