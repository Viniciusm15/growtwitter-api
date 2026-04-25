import jwt, { SignOptions } from "jsonwebtoken";
import { envs } from "../envs";

export class JwtUtil {
    static generateToken(payload: object): string {
        const options: SignOptions = {
            expiresIn: (envs.JWT_EXPIRES_IN ?? '24h') as SignOptions['expiresIn'],
        };
        return jwt.sign(payload, envs.JWT_SECRET, options);
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, envs.JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }
}
