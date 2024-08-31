import { UserService } from '../../users/services/user.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import bcrypt from 'bcryptjs';
import { JwtService } from '../../../core/services/jwt.service';

export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	async register(registerDto: RegisterDto) {
		const { username, password, email } = registerDto;

		const salt = bcrypt.getSalt('10');
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = await this.userService.createUser({
			password: hashedPassword,
			name: username,
			email
		});

		return this.jwtService.getToken({ id: user.id });
	}

	async login(loginDto: LoginDto) {
		const { email, password } = loginDto;

		const user = await this.userService.getUserByEmail(email);

		if (!user) {
			throw new Error('invalid credentials');
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error('invalid credentials');
		}

		return this.jwtService.getToken({ id: user.id });
	}
}
