import { Pool } from 'pg';
import { EnvConfigService } from '../config/env-config.service';

export class DatabaseService {
	private static instance: DatabaseService;

	private pool: Pool;

	private constructor(envConfigService: EnvConfigService) {
		this.pool = new Pool(envConfigService.getDatabaseConfigOptions());
	}

	public async query(text: string, params?: string[]) {
		const start = Date.now();
		const response = this.pool.query(text, params);
		const duration = Date.now() - start;
		console.log('executed query', { text, duration });
		return response;
	}

	public async close() {
		await this.pool.end();
	}

	public static getInstance(envConfigService: EnvConfigService) {
		if (!this.instance) {
			this.instance = new this(envConfigService);
		}
		return this.instance;
	}
}
