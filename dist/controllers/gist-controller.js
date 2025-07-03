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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = get;
exports.create = create;
exports.del = del;
exports.update = update;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const gistsBaseUrl = 'https://api.github.com/gists';
const headers = {
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: 'Bearer ' + config_1.config.api.github,
};
function get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get(`${gistsBaseUrl}/${req.params.id}`, {
                headers,
            });
            res.status(200).json({
                success: true,
                data,
            });
        }
        catch (e) {
            if (e.status === 404) {
                res.status(404).json({
                    success: false,
                    message: 'Gist not found',
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Something went wrong',
                });
            }
        }
    });
}
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { description, filename, content, public: isGistPublic } = req.body;
            const { data } = yield axios_1.default.post(gistsBaseUrl, {
                description,
                public: isGistPublic,
                files: {
                    [filename]: { content },
                },
            }, { headers });
            res.status(200).json({
                success: true,
                data,
            });
        }
        catch (_a) {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
            });
        }
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { filename, content } = req.body;
            yield axios_1.default.patch(`${gistsBaseUrl}/${req.params.id}`, {
                files: {
                    [filename]: { content },
                },
            }, { headers });
            res.status(200).json({
                success: true,
                message: 'Gist updated',
            });
        }
        catch (e) {
            if (e.status === 404) {
                res.status(404).json({
                    success: false,
                    message: 'Gist not found',
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Something went wrong',
                });
            }
        }
    });
}
function del(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield axios_1.default.delete(`${gistsBaseUrl}/${req.params.id}`, {
                headers,
            });
            res.status(200).json({
                success: true,
                message: 'Gist deleted',
            });
        }
        catch (e) {
            if (e.status === 404) {
                res.status(404).json({
                    success: false,
                    message: 'Gist not found',
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Something went wrong',
                });
            }
        }
    });
}
