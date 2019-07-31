import request = require('request');
import {AUTH0_URL} from '../../utils/config';

class UserService {

    constructor() { }

    public getUser(token: any) {
     return new Promise((resolve, reject) => {
         const options = { method: 'POST',
             url: `${AUTH0_URL}/userinfo`,
             headers: {Authorization: token }};

         request(options, (error, response, body) => {
             if (error) { throw new Error(error); }
             resolve(body);
         });
     });
 }




}

export default UserService;
