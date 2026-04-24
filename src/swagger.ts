import { z } from "zod";
import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createUserSchema, loginSchema } from "./validators/user.validator";

export const registry = new OpenAPIRegistry();

registry.registerPath({
    method: "post",
    path: "/users",
    tags: ["Users"],
    summary: "Create a new user",
    request: { body: { content: { "application/json": { schema: createUserSchema } } } },
    responses: {
        201: { description: "User created successfully." },
        400: { description: "Validation error." },
        409: { description: "Email already in use." },
    },
});

registry.registerPath({
    method: "get",
    path: "/users/{id}",
    tags: ["Users"],
    summary: "Find user by ID",
    request: { params: z.object({ id: z.string() }) },
    responses: {
        200: { description: "User found." },
        404: { description: "User not found." },
    },
});

registry.registerPath({
    method: "post",
    path: "/login",
    tags: ["Users"],
    summary: "Login",
    request: { body: { content: { "application/json": { schema: loginSchema } } } },
    responses: {
        200: { description: "Login successful." },
        401: { description: "Invalid credentials." },
    },
});

export function generateSwaggerSpec() {
    const generator = new OpenApiGeneratorV3(registry.definitions);
    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: "API Growtwitter Documentation",
            version: "1.0.0",
            description: 'API REST do Growtwitter - Uma rede social inspirada no Twitter/X.'
        },
        components: {
            securitySchemes: {
                bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
            },
        },
    });
}
