import { EnvConfigService } from './core/config/env-config.service';
import { Server } from './server';
import { DatabaseService } from './core/db/database.service';

(() => {
	main();
})();

function main(): void {
	const envConfigService = EnvConfigService.getInstance();
	const databaseService = DatabaseService.getInstance(envConfigService);
	const server = new Server(envConfigService, databaseService);

	void server.start();
}
