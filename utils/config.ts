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

export const AUTH0_CLIENT_ID: string = process.env.AUTH0_CLIENT_ID || '';
export const AUTH0_DOMAIN: string = process.env.AUTH0_DOMAIN || '';
export const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET || '';
export const LOG_LEVEL = process.env.LOG_LEVEL || '';
export const JWKS_URL = process.env.JWKS_URL || '';
export const JWKS_AUDIENCE = process.env.JWKS_AUDIENCE || '';
export const JWKS_ISSUER = process.env.JWKS_ISSUER || '';
export const JWKS_ALGORITHM = process.env.JWKS_ALGORITHM || '';
