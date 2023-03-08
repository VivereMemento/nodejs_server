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
exports.handleLogin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const roles_list_1 = require("../config/roles_list");
const ROLES_LIST_VALUES = Object.values(roles_list_1.ROLES_LIST);
const handleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password)
        return res
            .status(400)
            .json({ message: 'Email and password are required.' });
    const foundUser = yield User_1.default.findOne({ email }).exec();
    if (!foundUser)
        return res.sendStatus(401); //Unauthorized
    // evaluate password
    const match = yield bcrypt_1.default.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const roles = Object.values(foundUser.roles);
        const accessToken = jsonwebtoken_1.default.sign({ UserInfo: { email: foundUser.email, roles: roles } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        const refreshToken = jsonwebtoken_1.default.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = yield foundUser.save();
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({ accessToken, roles });
    }
    else {
        res.sendStatus(401);
    }
});
exports.handleLogin = handleLogin;
