"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRouter = void 0;
const express_1 = __importDefault(require("express"));
const email_controller_1 = require("../controllers/email-controller");
const emailRouter = express_1.default.Router();
exports.emailRouter = emailRouter;
emailRouter.post('/send', email_controller_1.send);
