"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateUser = joi_1.default.object().keys({
    userName: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password: joi_1.default.any().equal(joi_1.default.ref('password'))
        .label('confirm password').messages({ 'any.only': '{{#label}} does not mean' })
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
//SQL INJECTION =>>> something to avoid 
let name = "0";
