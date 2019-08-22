import { config } from 'dotenv';
config();
let path;
switch (process.env.NODE_ENV) {
    case 'production':
        path = `${__dirname}/../env/prod.env`;
        break;
    case 'develop':
        path = `${__dirname}/../env/dev.env`;
        break;
    default:
        path = `${__dirname}/../env/dev.env`;
}
config({ path });


export const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || '';
export const AUTH0_SCOPE = process.env.AUTH0_SCOPE || '';
export const AUTH0_CLIENT_ID =  process.env.AUTH0_CLIENT_ID || '';
export const AUTH0_AUDIENCE  = process.env.AUTH0_AUDIENCE || '';

export const AUTH0_MANAGEMENT_API_KEY = process.env.AUTH0_MANAGEMENT_API_KEY || '';
export const AUTH0_MANAGEMENT_API_SECRET = process.env.AUTH0_MANAGEMENT_API_SECRET || '';

export const JWKS_URL = process.env.JWKS_URL || '';
export const JWKS_AUDIENCE = process.env.JWKS_AUDIENCE || '';
export const JWKS_ISSUER = process.env.JWKS_ISSUER || '';
export const JWKS_ALGORITHM = process.env.JWKS_ALGORITHM || '';

export const MONGO_URL = process.env.MONGO_URL || '';
export const MONGO_USER = process.env.MONGO_USER || '';
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';

export const STRIPE_API_KEY = process.env.STRIPE_API_KEY || '';
export const STRIPE_API_SECRET = process.env.STRIPE_API_SECRET || '';
