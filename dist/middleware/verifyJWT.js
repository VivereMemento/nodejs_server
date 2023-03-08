"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')))
        return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        const decodedUser = decoded;
        if (err)
            return res.sendStatus(403); //invalid token
        req.email = decodedUser === null || decodedUser === void 0 ? void 0 : decodedUser.UserInfo.email;
        req.roles = decodedUser === null || decodedUser === void 0 ? void 0 : decodedUser.UserInfo.roles;
        next();
    });
};
exports.default = verifyJWT;
