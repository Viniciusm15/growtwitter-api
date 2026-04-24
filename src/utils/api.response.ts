import { Response } from "express";
import { HTTPError } from "../utils/http.error";

export interface ApiResponse<T = null> {
    success: boolean;
    message: string;
    data?: T;
    details?: any[];
}

export const onSuccess = <T>(
    res: Response,
    message: string,
    data?: T,
    statusCode: number = 200
): Response => {
    const response: ApiResponse<T> = {
        success: true,
        message,
    };

    if (data !== undefined) {
        response.data = data;
    }

    return res.status(statusCode).json(response);
};

export const onError = (error: unknown, res: Response): Response => {
    if (error instanceof HTTPError) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.message,
            details: error.details
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal server error",
        details: [
            {
                type: "system",
                field: "unknown",
                description: (error as Error).toString(),
                location: (error as Error).name,
            },
        ],
    });
};
