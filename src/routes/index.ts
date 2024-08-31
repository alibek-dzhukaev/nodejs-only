import type { IncomingMessage, OutgoingMessage } from 'http';

type Handler = (request: IncomingMessage, response: OutgoingMessage, params?: Record<string, string>) => void;

type RouteDefinition = {
	handler: Handler;
	regex: RegExp;
	paramNames: string[];
};

export abstract class Route {
	private readonly routes: Record<string, RouteDefinition[]> = {};

	protected get(path: string, handler: Handler) {
		this.addRoute('GET', path, handler);
	}

	protected post(path: string, handler: Handler) {
		this.addRoute('POST', path, handler);
	}

	protected put(path: string, handler: Handler) {
		this.addRoute('PUT', path, handler);
	}

	protected delete(path: string, handler: Handler) {
		this.addRoute('DELETE', path, handler);
	}

	private addRoute(method: string, path: string, handler: Handler) {
		const { regex, paramNames } = this.pathToRegExp(path);
		this.routes[method] = this.routes[method] || [];
		this.routes[method].push({ handler, regex, paramNames });
	}

	private pathToRegExp(path: string): { regex: RegExp; paramNames: string[] } {
		const paramNames: string[] = [];
		const regexString = path.replace(/:([a-zA-Z0-9]+)/g, (_, paramName) => {
			paramNames.push(paramName);
			return '([^\\/]+)';
		});

		const regex = new RegExp(`^${regexString}$`);
		return { regex, paramNames };
	}

	public handle(request: IncomingMessage, response: OutgoingMessage) {
		const methodRoutes = this.routes[request.method || ''];
		if (!methodRoutes) {
			response.setHeader('Content-Type', 'text/plain');
			response.end('404 Not Found\n');
			return;
		}

		const url = request.url || '';
		for (const route of methodRoutes) {
			const match = route.regex.exec(url);
			if (match) {
				const params = this.extractParams(route.regex, match);
				route.handler(request, response, params);
			}
		}
	}

	private extractParams(regex: RegExp, match: RegExpMatchArray): Record<string, string> {
		const params: Record<string, string> = {};
		const paramsNames = Array.from(regex.source.matchAll(/:([a-zA-Z0-9_]+)/g)).map((m) => m[1]);
		paramsNames.forEach((name, index) => {
			params[name] = match[index + 1];
		});
		return params;
	}
}
