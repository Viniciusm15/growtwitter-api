import { UserDto, UserFullDto } from "../models/user.model";
import { z } from "zod";
import { createUserSchema, loginSchema } from "../validators/user.validator";

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type LoginDTO = z.infer<typeof loginSchema>;

export type UserResponseDTO = UserDto;
export type UserFullResponseDTO = UserFullDto;

export interface LoginResponseDTO {
    user: UserResponseDTO;
    token: string;
}
