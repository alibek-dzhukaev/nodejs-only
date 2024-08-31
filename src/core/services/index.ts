import { JwtService } from './jwt.service';
import { EnvConfigService } from '../config/env-config.service';

const envConfigService = EnvConfigService.getInstance();
const jwtService = new JwtService(envConfigService);

export { jwtService };
