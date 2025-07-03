"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = send;
const send_email_1 = require("../utils/send-email");
const config_1 = require("../config");
const email_styles_1 = require("../styles/email-styles");
function send(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { subject, message, attachments } = req.body;
        if (!req.body || !subject || !message) {
            res.status(400).json({
                success: false,
                message: 'Incorrect body',
            });
        }
        try {
            yield (0, send_email_1.sendEmail)(subject, `<html><head>${email_styles_1.emailStyles}</head><body>${message}</body></html>`, config_1.config.mail.username, config_1.config.mail.username, attachments);
            res.status(200).json({
                success: true,
                message: `Email sent to ${config_1.config.mail.username}`,
            });
        }
        catch (_a) {
            res.status(500).json({
                success: false,
                message: 'Something went wrong.',
            });
        }
    });
}
