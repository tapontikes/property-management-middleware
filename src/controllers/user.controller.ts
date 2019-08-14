import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import UserService from '../service/user.service';
import {IRequest, IResponse} from '../models/models';
import {checkJwt} from '../middleware/middleware';

@Controller('api/user')
@ClassMiddleware([checkJwt])
export class UserController {

    private userService = new UserService();

    @Get('/')
    private getCurrentUser(req: IRequest, res: IResponse) {

        this.userService.getUser(req.token, req.user.sub).then((user) => {
            res.send({
                user,
            });
        });
    }

    @Put('update')
    private updateUserMetadata(req: IRequest, res: IResponse) {
        this.userService.updateUserMetadata(req.user.sub, req.body).then((response) =>{
            res.send(response);
        });
    }


}
