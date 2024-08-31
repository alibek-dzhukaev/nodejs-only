import type { EnvConfigService } from '../config/env-config.service';
import { JwtStrategy } from '../strategies/jwt.strategy';

export class JwtService extends JwtStrategy {
	public constructor(private readonly envConfigService: EnvConfigService) {
		super();
	}

	getToken(data: JwtUserPayload) {
		return this.sign(data, this.envConfigService.getJwtSecret(), {
			expiresIn: '1h'
		});
	}
}

type JwtUserPayload = {
	id: string;
};
