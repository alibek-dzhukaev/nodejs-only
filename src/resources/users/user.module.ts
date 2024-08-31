import { UserRepository } from './repositories/user.repository';
import { DatabaseService } from '../../core/db/database.service';
import { EnvConfigService } from '../../core/config/env-config.service';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

const envConfigService = EnvConfigService.getInstance();
const databaseService = DatabaseService.getInstance(envConfigService);

const userRepository = new UserRepository(databaseService);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export { userController, userService };
