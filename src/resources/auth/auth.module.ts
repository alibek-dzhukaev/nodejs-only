import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { userService } from '../users/user.module';
import { jwtService } from '../../core/services';

const authService = new AuthService(userService, jwtService);
const authController = new AuthController(authService);

export { authController };
