import { UserRepository } from "../database/user.repository";
import { BcryptUtil } from "../utils/bcrypt";
import { JwtUtil } from "../utils/jwt";
import { HTTPError } from "../utils/http.error";
import { CreateUserDTO, LoginDTO, LoginResponseDTO, UserResponseDTO, UserFullResponseDTO } from "../dtos/user.dto";

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data: CreateUserDTO): Promise<UserResponseDTO> {
        const emailExists = await this.userRepository.findByEmail(data.email);

        if (emailExists) {
            throw new HTTPError("Email already in use.", 409);
        }

        const hashedPassword = await BcryptUtil.hash(data.password);

        const user = await this.userRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            avatar: data.avatar || null
        });

        return user.toJSON();
    }

    async findById(id: number): Promise<UserResponseDTO> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new HTTPError("User not found.", 404);
        }

        return user.toFullJSON();
    }

    async login(data: LoginDTO): Promise<LoginResponseDTO> {
        const result = await this.userRepository.findByEmailWithPassword(data.email);

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
