import 'dotenv/config';
import { get } from 'env-var';
import type { PoolConfig } from 'pg';

export class EnvConfigService {
	private static instance: EnvConfigService;

	public getAppPort(): number {
		return get('APP_PORT').required().asPortNumber();
	}

	public getDatabaseConfigOptions(): PoolConfig {
		return {
			password: get('POSTGRES_PASSWORD').required().asString(),
			database: get('POSTGRES_DATABASE').required().asString(),
			user: get('POSTGRES_USER').required().asString(),
			port: get('POSTGRES_PORT').required().asPortNumber(),
			host: get('POSTGRES_HOST').required().asString()
		};
	}

	public getJwtSecret() {
		return get('JWT_SECRET').required().asString();
	}

	public static getInstance() {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance;
	}
}
