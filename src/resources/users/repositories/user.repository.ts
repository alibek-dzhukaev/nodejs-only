import type { DatabaseService } from '../../../core/db/database.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserModel } from '../types/user.model';

export class UserRepository {
	constructor(private readonly databaseService: DatabaseService) {}

	async findAll(): Promise<UserModel[]> {
		const response = await this.databaseService.query('SELECT * FROM users');
		return response.rows;
	}

	async findById(id: string): Promise<UserModel> {
		const response = await this.databaseService.query('SELECT * FROM users WHERE id = $1', [id]);
		return response.rows[0];
	}

	async findByEmail(email: string): Promise<UserModel> {
		const response = await this.databaseService.query('SELECT * FROM users WHERE email = $1', [email]);
		return response.rows[0];
	}

	async create(user: CreateUserDto): Promise<UserModel> {
		const response = await this.databaseService.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [
			user.name,
			user.email
		]);
		return response.rows[0];
	}

	async update(id: string, user: UpdateUserDto): Promise<void> {
		const response = await this.databaseService.query(
			'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
			[user.name, user.email, id]
		);
		return response.rows[0];
	}

	async delete(id: string): Promise<void> {
		const response = await this.databaseService.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
		return response.rows[0];
	}
}
