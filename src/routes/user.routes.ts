import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createUserSchema, loginSchema } from "../validators/user.validator";

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/users', validateBody(createUserSchema), userController.create.bind(userController));
userRoutes.get('/users/:id', authMiddleware, userController.findById.bind(userController));
userRoutes.post('/users/login', validateBody(loginSchema), userController.login.bind(userController));

export { userRoutes };
