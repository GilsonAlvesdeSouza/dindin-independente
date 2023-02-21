import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';
import { signOut } from '@/contexts/AuthContext';

export default function setupAPIClient(ctx = undefined) {
	let cookies = parseCookies(ctx);

	const api = axios.create({
		baseURL: 'http://localhost:3001',
		headers: {
			Authorization: `Bearer ${cookies['@dindin.token']}`,
			'content-type': 'application/json'
		}
	});

	api.interceptors.response.use(
		(response) => {
			return response;
		},
		(error: AxiosError) => {
			if (error.response?.status === 401) {
				// todo qualquer erro devemos deslogar o usuário
				if (typeof window !== undefined) {
					signOut();
				} else {
					return Promise.reject(new AuthTokenError());
				}
			}
			return Promise.reject(error);
		}
	);

	return api;
}
