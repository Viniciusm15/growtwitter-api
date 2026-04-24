import { Request, Response, NextFunction } from 'express';
import { JwtUtil } from '../utils/jwt';

export interface AuthRequest extends Request {
    userId?: number;
}

export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({ success: false, message: 'Token not provided.' });
            return;
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
            res.status(401).json({ success: false, message: 'Invalid token format.' });
            return;
        }

        const decoded = JwtUtil.verifyToken(parts[1]);
        req.userId = decoded.id;
        next();
    } catch {
        res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
};
