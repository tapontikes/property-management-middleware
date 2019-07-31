import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import {checkJwt} from '../middleware/middleware';
import {IPropertyDocument, IRequest, IResponse} from '../models/models';
import PropertiesService from '../service/properties.service';


@Controller('api/properties')
@ClassMiddleware([checkJwt])
export class PropertiesController {

    public propertiesService = new PropertiesService();

    @Get('')
    private getProperties(req: IRequest, res: IResponse) {
        this.propertiesService.getProperties().then((properties: IPropertyDocument[]) => {
            res.json(properties);
        });
    }

    @Post('assign/:id')
    private assignTenant(req: IRequest, res: IResponse) {
        if (!req.params.id) {
            res.status(400).send('id missing');
        }
        this.propertiesService.assignTenant(req.user.sub, req.params.id).then((updated: number) => {
           res.json(updated);
        }).catch((err) => {
            res.status(500).send(err);
        });

    }

}
