"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.config = {
    dev: process.env.NODE_ENV === 'dev',
    api: {
        github: process.env.GITHUB_TOKEN,
    },
    server: {
        port: process.env.PORT || 5000,
        allowedOrigins: process.env.CLIENT_URLS ? process.env.CLIENT_URLS.split(',') : [],
    },
    mail: {
        service: process.env.MAIL_SERVICE || 'gmail',
        username: process.env.MAIL_USERNAME || '',
        password: process.env.MAIL_PASSWORD || '',
    },
};
