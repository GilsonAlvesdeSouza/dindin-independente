import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult
} from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from '@/services/errors/AuthTokenError';

//Função para paginas que só podem ser acessadas por usuários logadas

export function canSSRAuth<P extends { [key: string]: any }>(
	fn: GetServerSideProps<P>
) {
	return async (
		ctx: GetServerSidePropsContext
	): Promise<GetServerSidePropsResult<P>> => {
		const cookies = parseCookies(ctx);

		if (!cookies['@dindin.token']) {
			return {
				redirect: {
					destination: '/',
					permanent: false
				}
			};
		}
		try {
			return await fn(ctx);
		} catch (err) {
			if (err instanceof AuthTokenError) {
				destroyCookie(ctx, '@dindin.token');

				return {
					redirect: {
						destination: '/',
						permanent: false
					}
				};
			}
		}
		return await fn(ctx);
	};
}
