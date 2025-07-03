"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gistRouter = void 0;
const express_1 = __importDefault(require("express"));
const gist_controller_1 = require("../controllers/gist-controller");
const gistRouter = express_1.default.Router();
exports.gistRouter = gistRouter;
gistRouter.post('/', gist_controller_1.create);
gistRouter.get('/:id', gist_controller_1.get);
gistRouter.delete('/:id', gist_controller_1.del);
gistRouter.patch('/:id', gist_controller_1.update);
