import { Route } from './index';
import { userController } from '../resources/users/user.module';

export class UsersRoute extends Route {
	constructor() {
		super();
		this.initialize();
	}

	private initialize() {
		this.get('/users', (request, response) => {
			void userController.getUsers(request, response);
		});

		this.get('/users/:id', (request, response, params) => {
			void userController.getUserById(request, response, params);
		});

		this.post('/users', (request, response) => {
			void userController.createUser(request, response);
		});

		this.delete('/users', (request, response) => {
			void userController.deleteUser(request, response);
		});
	}
}
