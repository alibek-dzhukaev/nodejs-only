import type { IncomingMessage, OutgoingMessage } from 'http';
import type { Route } from './routes';

export class App {
	private readonly routes: Route[] = [];

	public constructor(
		private readonly request: IncomingMessage,
		private readonly response: OutgoingMessage
	) {}

	public use(route: Route) {
		this.routes.push(route);
	}

	public handleRequest() {
		for (const route of this.routes) {
			route.handle(this.request, this.response);
			if (this.response.finished) {
				return;
			}
		}
		if (!this.response.finished) {
			this.response.setHeader('Content-Type', 'text/plain');
			this.response.end('404 Not Found\n');
		}
	}
}
