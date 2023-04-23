const { toLowecase } = require('../util/common');
const envVars = {};

const NODE_ENV = toLowecase(process.env.NODE_ENV || 'development');
const dbPath = 'mongodb://localhost:27017/blog-site-backend';

switch (NODE_ENV) {
  case 'production':
    envVars.env = 'production';
    envVars.FRONTEND_HOST = process.env.FRONTEND_HOST || 'http://localhost:5001';
    envVars.DB_URI = process.env.DB_URI || dbPath;
    envVars.PORT = process.env.port || process.env.PORT || 3000;
    envVars.SALT_ROUNDS = 10;
    envVars.JWT_SECRET = process.env.JWT_SECRET || 'thisissupersecretpassword';
    envVars.JWT_EXPIRY = process.env.JWT_EXPIRY || 24;
    envVars.FORGOT_PASSWORD_TOKEN_EXPIRY = process.env.FORGOT_PASSWORD_TOKEN_EXPIRY || 15;
    envVars.MAIL_HOST = process.env.MAIL_HOST;
    envVars.MAIL_PORT = process.env.MAIL_PORT;
    envVars.MAIL_USER = process.env.MAIL_USER;
    envVars.MAIL_PASS = process.env.MAIL_PASS;
    break;

  case 'development':
    envVars.env = 'development';
    envVars.FRONTEND_HOST = process.env.FRONTEND_HOST || 'http://localhost:5001';
    envVars.DB_URI = dbPath;
    envVars.PORT = 3000;
    envVars.SALT_ROUNDS = 10;
    envVars.JWT_SECRET = 'thisissupersecretpassword';
    envVars.JWT_EXPIRY = 24;
    envVars.FORGOT_PASSWORD_TOKEN_EXPIRY = 15;
    envVars.MAIL_HOST = process.env.MAIL_HOST || 'smtp.gmail.com';
    envVars.MAIL_PORT = process.env.MAIL_PORT || 465;
    envVars.MAIL_USER = process.env.MAIL_USER || 'jobportalapptest@gmail.com';
    envVars.MAIL_PASS = process.env.MAIL_PASS || 'lxerunlchehksmma';
    break;

  default:
    envVars.env = 'development';
    envVars.FRONTEND_HOST = process.env.FRONTEND_HOST || 'http://localhost:5001';
    envVars.DB_URI = dbPath;
    envVars.PORT = 3000;
    envVars.JWT_SECRET = 'thisissupersecretpassword';
    envVars.SALT_ROUNDS = 10;
    envVars.JWT_EXPIRY = 24;
    envVars.FORGOT_PASSWORD_TOKEN_EXPIRY = 15;
    envVars.MAIL_HOST = process.env.MAIL_HOST || 'smtp.ethereal.email';
    envVars.MAIL_PORT = process.env.MAIL_PORT || 587;
    envVars.MAIL_USER = process.env.MAIL_USER;
    envVars.MAIL_PASS = process.env.MAIL_PASS;
}

module.exports = envVars;
