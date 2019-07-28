import { Request, Response } from 'express';
import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';


@Controller('auth')
export class AuthController {

    @Get('/login')
    private login(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        res.status(200).json({
            message: 'authed',
        });
    }


}
