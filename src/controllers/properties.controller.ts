import { Request, Response } from 'express';
import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import {checkJwt} from '../middleware/middleware';
import UserService from '../service/user.service';
import {IPropertyDocument, IRequest, IResponse} from '../models/models';
import PropertiesService from '../service/properties.service';


@Controller('api/properties')
@ClassMiddleware([checkJwt])
export class PropertiesController {

    public propertiesService = new PropertiesService();

    @Get('/')
    private getProperties(req: IRequest, res: IResponse) {
      this.propertiesService.getProperties().then((properties: IPropertyDocument[]) => {
        res.json(properties);
      })
    /*
      const prop = {
            address: '1193 Cranston St.',
            city: 'Cranston',
            rent: 1500,
            state: 'RI',
            } as IPropertyDocument;
        this.propertiesService.insertProperty(prop).then((props) => {
            res.send(props);
        });
     */


    /*
    @Get(':msg')
    private getMessage(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        res.status(200).json({
            message: req.params.msg,
        });
    }

    @Put(':msg')
    private putMessage(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        return res.status(400).json({
            error: req.params.msg,
        });
    }

    @Post(':msg')
    private postMessage(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        return res.status(400).json({
            error: req.params.msg,
        });
    }

    @Delete(':msg')
    private delMessage(req: Request, res: Response) {
            return res.status(400).json({
                error: req.params.msg,
            });
        }

     */
}
