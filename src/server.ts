import http from 'node:http';
import { App } from './app';
import type { DatabaseService } from './core/db/database.service';
import type { EnvConfigService } from './core/config/env-config.service';
import { UsersRoute } from './routes/users';

export class Server {
	private readonly server = http.createServer((request, response) => {
		const app = new App(request, response);
		app.use(new UsersRoute());
		app.handleRequest();
	});

	public constructor(
		private readonly envConfigService: EnvConfigService,
		private readonly databaseService: DatabaseService
	) {}

	public async start(): Promise<void> {
		this.server.listen(this.envConfigService.getAppPort(), () => {
			console.log('server running at http://localhost:%s/', this.envConfigService.getAppPort());
		});

		process.on('SIGINT', async () => {
			console.log('closing server...');
			this.server.close();
			await this.databaseService.close();
			console.log('server closed. database connection closed.');
			process.exit(0);
		});
	}
}
