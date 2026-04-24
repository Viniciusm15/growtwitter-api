import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserDTO, LoginDTO } from "../dtos/user.dto";
import { onSuccess, onError } from "../utils/api.response";

export class UserController {
    private service: UserService;

    constructor() {
        this.service = new UserService();
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const dto: CreateUserDTO = req.body;
            const user = await this.service.create(dto);
            return onSuccess(res, "User created successfully.", user, 201);
        } catch (error) {
            return onError(error, res);
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {
        try {
            const id = Number(req.params.id);
            const user = await this.service.findById(id);
            return onSuccess(res, "User found.", user);
        } catch (error) {
            return onError(error, res);
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const dto: LoginDTO = req.body;
            const result = await this.service.login(dto);
            return onSuccess(res, "Login successful.", result);
        } catch (error) {
            return onError(error, res);
        }
    }
}
