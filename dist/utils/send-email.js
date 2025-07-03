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
exports.sendEmail = sendEmail;
const nodemailer_1 = require("nodemailer");
const config_1 = require("../config");
const transporter = (0, nodemailer_1.createTransport)({
    service: config_1.config.mail.service,
    auth: {
        user: config_1.config.mail.username,
        pass: config_1.config.mail.password,
    },
});
function sendEmail(subject_1, message_1, to_1, from_1) {
    return __awaiter(this, arguments, void 0, function* (subject, message, to, from, attachments = []) {
        const options = {
            from,
            to,
            subject,
            html: message,
            attachments,
        };
        return new Promise((resolve, reject) => {
            transporter.sendMail(options, (err, info) => {
                if (err) {
                    console.error('Email sending failed:', err);
                    reject(new Error(err.message));
                }
                else {
                    console.log('Email sent:', info.messageId);
                    resolve(info.messageId);
                }
            });
        });
    });
}
