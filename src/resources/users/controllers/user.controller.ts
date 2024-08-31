import type { UserService } from '../services/user.service';
import type { IncomingMessage, OutgoingMessage } from 'http';
import { BodyParser } from '../../../core/services/body-parser';
import type { CreateUserDto } from '../dto/create-user.dto';
import type { UpdateUserDto } from '../dto/update-user.dto';

export class UserController {
	constructor(private readonly userService: UserService) {}

	async createUser(request: IncomingMessage, response: OutgoingMessage) {
		try {
			const createUserDto = await BodyParser.parse<CreateUserDto>(request);
			const user = await this.userService.createUser(createUserDto);
			this.send(response, user);
		} catch (err) {
			response.end(JSON.stringify({ error: err }));
		}
	}

	async getUsers(request: IncomingMessage, response: OutgoingMessage) {
		try {
			const users = await this.userService.getAllUsers();
			this.send(response, users);
		} catch (err) {
			response.end(JSON.stringify({ error: err }));
		}
	}

	async getUserById(request: IncomingMessage, response: OutgoingMessage, params?: Record<string, string>) {
		try {
			if (!params || !params.id) {
				throw new Error('id not provided');
			}
			const user = await this.userService.getUserById(params.id);
			if (!user) {
				throw new Error('user not found');
			}
			this.send(response, user);
		} catch (err) {
			response.end(JSON.stringify({ error: err }));
		}
	}

	async updateUser(request: IncomingMessage, response: OutgoingMessage, params?: Record<string, string>) {
		try {
			if (!params || !params.id) {
				throw new Error('id not provided');
			}

			const updateUserDto = await BodyParser.parse<UpdateUserDto>(request);
			await this.userService.updateUser(params.id, updateUserDto);
		} catch (err) {
			response.end(JSON.stringify({ error: err }));
		}
	}

	async deleteUser(request: IncomingMessage, response: OutgoingMessage, params?: Record<string, string>) {
		try {
			if (!params || !params.id) {
				throw new Error('id not provided');
			}

			await this.userService.deleteUser(params.id);
		} catch (err) {
			response.end(JSON.stringify({ error: err }));
		}
	}

	private send<T>(request: OutgoingMessage, payload: T) {
		request.setHeader('Content-Type', 'application/json');
		request.end(JSON.stringify(payload));
	}
}
