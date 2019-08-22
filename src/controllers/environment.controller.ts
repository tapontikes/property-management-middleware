import {Controller, Get} from '@overnightjs/core';
import {IRequest, IResponse} from '../models/models';
import {AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_SCOPE, STRIPE_API_KEY} from '../../utils/config';

@Controller('api/environments')
export class EnvironmentController {

    private environment = {
        AUTH0_DOMAIN,
        AUTH0_CLIENT_ID,
        AUTH0_AUDIENCE,
        AUTH0_SCOPE,
        STRIPE_API_KEY,
    };

    @Get('/')
    private getEnvironment(req: IRequest, res: IResponse) {
        res.status(200).send(this.environment);
    }


}
