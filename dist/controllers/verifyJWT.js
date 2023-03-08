"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer ')))
        return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jsonwebtoken_1.default.verify(token, 
    // process.env.ACCESS_TOKEN_SECRET,
    '01e8b4d35f3349e2820a59e2a326d635e515184c8e73ff23605b219ba5e472224f8796473a46dbfa8385324bf534fdd98c18aad9b636079f43671d18199f0f9e', (err, decoded) => {
        const decodedUser = decoded;
        if (err)
            return res.sendStatus(403); //invalid token
        req.email = decodedUser === null || decodedUser === void 0 ? void 0 : decodedUser.UserInfo.email;
        req.roles = decodedUser === null || decodedUser === void 0 ? void 0 : decodedUser.UserInfo.roles;
        next();
    });
};
exports.verifyJWT = verifyJWT;
// interface IDecode {
//     address: string,
//     role: string,
//     iat: number,
//     exp: number
//   };
//  interface RequestWithUserRole extends Request {
//     user?: IDecode,
// }
//  const parseToken = (secret: string) =>
//   async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
//     try{
//       const token  = req.headers?.authorization?.split(' ')[1];
//       // console.log(req.headers?.authorization);
//       if (!token) {
//         return res.status(403).json({message: 'Token not  found'})
//       }
//       const decodedData = <IDecode> jwt.verify(token, secret);
//       req.user = decodedData;
//       // console.log(decodedData);
//       return next();
//     }
//     catch(e) {
//       return res.status(500).json({e})
//     }
// };
