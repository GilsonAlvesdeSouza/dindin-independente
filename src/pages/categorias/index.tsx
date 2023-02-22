import Head from 'next/head';
import { Header } from '@/components/Header';
import styles from './styles.module.scss';

export default function Category() {
	return (
		<>
			<Head>
				<title>Categorias</title>
			</Head>
			<div>
				<Header />

				<main className={styles.container}>
					<h1>Categorias</h1>
				</main>
			</div>
		</>
	);
}
