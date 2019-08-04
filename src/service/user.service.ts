import request = require('request');
import {AUTH0_URL} from '../../utils/config';
import {ClassMiddleware} from '@overnightjs/core';
import {getOrRefreshManagementApiToken} from '../middleware/middleware';

class UserService {

    public getUser(token: string, sub: string) {
     return new Promise((resolve, reject) => {
         const options = { method: 'GET',
             url: `${AUTH0_URL}/api/v2/users/${sub}`,
             headers: {Authorization: `Bearer ${token}` }};

         request(options, (error, response, body) => {
             if (error) { throw new Error(error); }
             resolve(body);
         });
     });
 }




}

export default UserService;
