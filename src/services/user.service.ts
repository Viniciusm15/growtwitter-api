import { UserRepository } from "../database/user.repository";
import { BcryptUtil } from '../utils/bcrypt';
import { JwtUtil } from '../utils/jwt';
import { HTTPError } from "../utils/http.error";
import { CreateUserDTO, LoginDTO, LoginResponseDTO, UserResponseDTO } from "../dtos/user.dto";

export class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    async create(data: CreateUserDTO): Promise<UserResponseDTO> {
        const emailExists = await this.repository.findByEmail(data.email);

        if (emailExists) {
            throw new HTTPError("Email already in use.", 409);
        }

        const hashedPassword = await BcryptUtil.hash(data.password);

        const user = await this.repository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            avatar: data.avatar || null
        });

        return user.toJSON();
    }

    async findById(id: number): Promise<UserResponseDTO> {
        const user = await this.repository.findById(id);

        if (!user) {
            throw new HTTPError("User not found.", 404);
        }

        return user.toJSON();
    }

    async login(data: LoginDTO): Promise<LoginResponseDTO> {
        const result = await this.repository.findByEmailWithPassword(data.email);

        if (!result) {
            throw new HTTPError("Invalid credentials.", 401);
        }

        const passwordMatch = await BcryptUtil.compare(data.password, result.password);
        if (!passwordMatch) {
            throw new HTTPError("Invalid credentials.", 401);
        }

        const token = JwtUtil.generateToken({ id: result.user.getId() });
        return { user: result.user.toJSON(), token };
    }
}
