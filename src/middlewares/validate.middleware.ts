import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { HTTPError } from "../utils/http.error";

export function validateBody(schema: ZodSchema) {
    return (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const details = result.error.errors.map((e) => e.message);
            return next(new HTTPError("Validation error.", 400, details));
        }

        req.body = result.data;
        next();
    };
}
