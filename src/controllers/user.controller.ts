import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import UserService from '../service/user.service';
import {IRequest, IResponse} from '../models/models';

@Controller('api/user')
// @ClassMiddleware(checkJwt)
export class UserController {

    private userService = new UserService();

    @Get('/')
    private getCurrentUser(req: IRequest, res: IResponse) {
        let token = null;
        if (req.headers.authorization) {
            token = req.headers.authorization;
        }
        this.userService.getUser(token).then((user) => {
            res.send({
                user,
            });
        });
    }


}
