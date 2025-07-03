"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const email_route_1 = require("./routes/email-route");
const gist_route_1 = require("./routes/gist-route");
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: config_1.config.dev
        ? '*'
        : (origin, callback) => {
            if (origin && config_1.config.server.allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            }
            else {
                callback(null, false);
            }
        },
}));
app.get('/', (req, res) => {
    res.send('Hello');
});
app.use('/email', email_route_1.emailRouter);
app.use('/gists', gist_route_1.gistRouter);
exports.default = app;
