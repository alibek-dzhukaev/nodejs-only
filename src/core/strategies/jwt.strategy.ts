import jwt, { SignOptions } from 'jsonwebtoken';

export class JwtStrategy {
	protected sign<T extends string | Buffer | object>(payload: T, secretOrPrivateKey: jwt.Secret, options: SignOptions) {
		return jwt.sign(payload, secretOrPrivateKey, options);
	}
}
