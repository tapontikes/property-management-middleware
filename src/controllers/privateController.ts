import { Request, Response } from 'express';
import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import * as expressJwt from 'express-jwt';
import {AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET} from '../../utils/config';

@Controller('api/protected')
@ClassMiddleware([expressJwt({
    secret: Buffer.from(AUTH0_CLIENT_SECRET, 'base64'),
    audience: AUTH0_CLIENT_ID,
})])
export class PrivateController {

    @Get('/')
    private getMessages(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        res.status(200).json({
            message: 'authed',
        });
    }

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
}
