import { JwtStrategy } from './jwt.strategy';
import { EnvConfigService } from '../config/env-config.service';

const envConfigService = EnvConfigService.getInstance();
const jwtStrategy = new JwtStrategy();
