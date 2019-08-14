import {
    AUTH0_DOMAIN,
    AUTH0_MANAGEMENT_API_KEY,
    AUTH0_MANAGEMENT_API_SECRET,
} from '../../utils/config';
import auth0Lib = require('auth0');

class UserService {

    private auth0: auth0Lib.ManagementClient<auth0Lib.AppMetadata, auth0Lib.UserMetadata>;

   constructor() {

       this.auth0 = new auth0Lib.ManagementClient({
           domain: AUTH0_DOMAIN,
           clientId: AUTH0_MANAGEMENT_API_KEY,
           clientSecret: AUTH0_MANAGEMENT_API_SECRET,
           scope: 'read:users update:users',
       });

       console.log(this.auth0)
   }

    public getUser(token: string, sub: string) {
     return new Promise((resolve, reject) => {
        this.auth0.getUser({id: sub}).then((user) =>{
            console.log(user);
            return user;
        });
     });
 }


 public updateUserMetadata(sub: string, metadata: object) {
     return new Promise((resolve, reject) => {
         this.auth0.updateAppMetadata({id: sub}, metadata).then((user) => {
             resolve(user.app_metadata);
         });
     });
 }




}

export default UserService;
