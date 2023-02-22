import Head from 'next/head';
import { Header } from '@/components/Header';
export default function Category() {
	return (
		<>
			<Head>
				<title>Transações</title>
			</Head>
			<Header />
			<h1>Transações</h1>
		</>
	);
}
