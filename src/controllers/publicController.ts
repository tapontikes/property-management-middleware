import { Request, Response } from 'express';
import {Controller, Get} from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';

@Controller('api/public')
export class PublicController {

    @Get('/')
    private getMessages(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        res.status(200).json({
            message: 'un-authed',
        });
    }

}
