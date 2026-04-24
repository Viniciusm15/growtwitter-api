import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const createUserSchema = z.object({
    name: z.string({ required_error: "Name is required." }).min(1, "Name is required.").openapi({ example: "John Doe" }),
    email: z.string({ required_error: "Email is required." }).email("Invalid email format.").openapi({ example: "john@email.com" }),
    password: z.string({ required_error: "Password is required." }).min(6, "Password must be at least 6 characters.").openapi({ example: "123456" }),
    avatar: z.string().optional().nullable(),
}).openapi("CreateUser");

export const loginSchema = z.object({
    email: z.string({ required_error: "Email is required." }).email("Invalid email format.").openapi({ example: "john@email.com" }),
    password: z.string({ required_error: "Password is required." }).min(1, "Password is required.").openapi({ example: "123456" }),
}).openapi("Login");
