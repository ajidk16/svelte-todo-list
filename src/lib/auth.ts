import { PUBLIC_JWT_SECRET } from '$env/static/public';
import jwt from 'jsonwebtoken';

export async function verifyJWT(token: string) {
	try {
		const decoded = jwt.verify(token, PUBLIC_JWT_SECRET);
		return decoded;
	} catch {
		return null;
	}
}

export async function createJWT(payload: object) {
	return jwt.sign(payload, PUBLIC_JWT_SECRET, { expiresIn: '1d' });
}
