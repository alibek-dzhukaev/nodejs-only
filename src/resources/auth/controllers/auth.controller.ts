import type { IncomingMessage, OutgoingMessage } from 'http';
import type { AuthService } from '../services/auth.service';
import { BodyParser } from '../../../core/services/body-parser';
import type { RegisterDto } from '../dto/register.dto';
import type { LoginDto } from '../dto/login.dto';

export class AuthController {
	public constructor(private readonly authService: AuthService) {}

	public async register(request: IncomingMessage, response: OutgoingMessage) {
		try {
			const registerDto = await BodyParser.parse<RegisterDto>(request);
			const token = await this.authService.register(registerDto);
			this.send(response, token);
		} catch (error) {
			response.end(JSON.stringify({ error }));
		}
	}

	public async login(request: IncomingMessage, response: OutgoingMessage) {
		try {
			const loginDto = await BodyParser.parse<LoginDto>(request);
			const token = await this.authService.login(loginDto);
			this.send(response, token);
		} catch (error) {
			response.end(JSON.stringify({ error }));
		}
	}

	private send<T>(request: OutgoingMessage, payload: T) {
		request.setHeader('Content-Type', 'application/json');
		request.end(JSON.stringify(payload));
	}
}
