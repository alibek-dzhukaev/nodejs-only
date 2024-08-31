import { Route } from './index';
import { authController } from '../resources/auth/auth.module';

export class AuthRoute extends Route {
	constructor() {
		super();
		this.initialize();
	}

	private initialize() {
		this.post('/auth/register', (request, response) => {
			void authController.register(request, response);
		});

		this.post('/auth/login', (request, response) => {
			void authController.login(request, response);
		});
	}
}
