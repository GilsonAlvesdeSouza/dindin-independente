import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult
} from 'next';
import { parseCookies } from 'nookies';

//Função para paginas que só podem ser acessadas por visitantes

export function canSSRGuest<P extends { [key: string]: any }>(
	fn: GetServerSideProps<P>
) {
	return async (
		ctx: GetServerSidePropsContext
	): Promise<GetServerSidePropsResult<P>> => {
		const cookies = parseCookies(ctx);

		if (cookies['@dindin.token']) {
			return {
				redirect: {
					destination: '/dashboard',
					permanent: false
				}
			};
		}
		return await fn(ctx);
	};
}
