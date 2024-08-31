import type { UserRepository } from '../repositories/user.repository';
import type { UpdateUserDto } from '../dto/update-user.dto';
import type { CreateUserDto } from '../dto/create-user.dto';

export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async getAllUsers() {
		return this.userRepository.findAll();
	}

	async getUserById(id: string) {
		return this.userRepository.findById(id);
	}

	async getUserByEmail(email: string) {
		return this.userRepository.findByEmail(email);
	}

	async createUser(user: CreateUserDto) {
		return this.userRepository.create(user);
	}

	async updateUser(id: string, user: UpdateUserDto) {
		return this.userRepository.update(id, user);
	}

	async deleteUser(id: string) {
		return this.userRepository.delete(id);
	}
}
