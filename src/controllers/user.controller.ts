import {Controller, Get, Put, Post, Delete, ClassMiddleware} from '@overnightjs/core';
import UserService from '../service/user.service';
import {IRequest, IResponse} from '../models/models';
import {getOrRefreshManagementApiToken} from '../middleware/middleware';

@Controller('api/user')
@ClassMiddleware(getOrRefreshManagementApiToken)
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


}
