import { IncomingMessage } from 'http';

export class BodyParser {
	static async parse<T>(request: IncomingMessage) {
		return new Promise<T>((resolve, reject) => {
			let body = '';

			request.on('data', (chunk) => {
				body += chunk.toString();
			});

			request.on('end', () => {
				try {
					resolve(JSON.parse(body));
				} catch (error) {
					reject(new Error('invalid JSON'));
				}
			});

			request.on('error', (error) => {
				reject(error);
			});
		});
	}
}
