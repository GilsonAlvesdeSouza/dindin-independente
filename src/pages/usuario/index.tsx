import Head from 'next/head';
import { Header } from '@/components/Header';
export default function Category() {
	return (
		<>
			<Head>
				<title>Usuário</title>
			</Head>
			<Header />
			<h1>Usuários</h1>
		</>
	);
}
