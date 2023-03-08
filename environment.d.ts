import { Secret } from 'jsonwebtoken';

export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			ACCESS_TOKEN_SECRET: Secret;
			REFRESH_TOKEN_SECRET: Secret;
			DATABASE_URI: string;
			ENV: 'test' | 'development' | 'production';
		}
	}
}
