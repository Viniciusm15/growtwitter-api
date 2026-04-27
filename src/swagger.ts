import { z } from "zod";
import { OpenApiGeneratorV3, OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createUserSchema, loginSchema } from "./validators/user.validator";
import { createTweetSchema, replyTweetSchema } from "./validators/tweet.validator";

export function generateSwaggerSpec() {
    const registry = new OpenAPIRegistry();

    registry.registerComponent("securitySchemes", "bearerAuth", {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
    });

    // Users
    registry.registerPath({
        method: "post",
        path: "/users",
        tags: ["Users"],
        summary: "Create a new user",
        security: [],
        request: { body: { content: { "application/json": { schema: createUserSchema } } } },
        responses: {
            201: { description: "User created successfully." },
            400: { description: "Validation error." },
            409: { description: "Email already in use." }
        },
    });

    registry.registerPath({
        method: "get",
        path: "/users/{id}",
        tags: ["Users"],
        summary: "Find user by ID",
        security: [{ bearerAuth: [] }],
        request: { params: z.object({ id: z.string() }) },
        responses: {
            200: { description: "User found." },
            401: { description: "Unauthorized - Token required." },
            404: { description: "User not found." }
        },
    });

    registry.registerPath({
        method: "post",
        path: "/login",
        tags: ["Users"],
        summary: "Login",
        security: [],
        request: { body: { content: { "application/json": { schema: loginSchema } } } },
        responses: {
            200: { description: "Login successful." },
            401: { description: "Invalid credentials." }
        },
    });

    // Tweets
    registry.registerPath({
        method: "post",
        path: "/tweets",
        tags: ["Tweets"],
        summary: "Create a new tweet",
        security: [{ bearerAuth: [] }],
        request: { body: { content: { "application/json": { schema: createTweetSchema } } } },
        responses: {
            201: { description: "Tweet created successfully." },
            400: { description: "Validation error." },
            401: { description: "Unauthorized - Token required." },
            404: { description: "User not found." }
        },
    });

    registry.registerPath({
        method: "post",
        path: "/tweets/reply",
        tags: ["Tweets"],
        summary: "Reply to a tweet",
        security: [{ bearerAuth: [] }],
        request: { body: { content: { "application/json": { schema: replyTweetSchema } } } },
        responses: {
            201: { description: "Reply created successfully." },
            400: { description: "Validation error." },
            401: { description: "Unauthorized - Token required." },
            404: { description: "User not found. / Parent tweet not found." },
        },
    });

    registry.registerPath({
        method: "get",
        path: "/feed",
        tags: ["Tweets"],
        summary: "Get authenticated user feed",
        security: [{ bearerAuth: [] }],
        responses: {
            200: { description: "Feed retrieved successfully." },
            401: { description: "Unauthorized - Token required." },
        },
    });

    // Likes
    registry.registerPath({
        method: "post",
        path: "/likes/{tweetId}",
        tags: ["Likes"],
        summary: "Like a tweet",
        security: [{ bearerAuth: [] }],
        request: { params: z.object({ tweetId: z.string() }) },
        responses: {
            201: { description: "Tweet liked successfully." },
            401: { description: "Unauthorized - Token required." },
            404: { description: "User not found. / Tweet not found." },
            409: { description: "Tweet already liked." },
        },
    });

    registry.registerPath({
        method: "delete",
        path: "/likes/{tweetId}",
        tags: ["Likes"],
        summary: "Unlike a tweet",
        security: [{ bearerAuth: [] }],
        request: { params: z.object({ tweetId: z.string() }) },
        responses: {
            200: { description: "Tweet unliked successfully." },
            401: { description: "Unauthorized - Token required." },
            404: { description: "User not found. / Tweet not found. / Like not found." },
        },
    });

    const generator = new OpenApiGeneratorV3(registry.definitions);
    return generator.generateDocument({
        openapi: "3.0.0",
        info: {
            title: "API Growtwitter Documentation",
            version: "1.0.0",
            description: 'API REST do Growtwitter - Uma rede social inspirada no Twitter/X.'
        },
        security: [{ bearerAuth: [] }],
    });
}
