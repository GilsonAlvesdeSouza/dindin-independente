import { useState } from 'react';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { FiRefreshCcw } from 'react-icons/fi';
import Head from 'next/head';
import { Header } from '@/components/Header';
import styles from './styles.module.scss';
import setupAPIClient from '@/services/api';

type extratoProps = {
	entrada: string;
	saida: string;
};

interface HomeProps {
	extrato: extratoProps;
}

export default function Dashboard({ extrato }: HomeProps) {
	const [entrada] = useState(extrato?.entrada);
	const [saida] = useState(extrato?.saida);

	return (
		<>
			<Head>
				<title>Painel Dindin</title>
			</Head>
			<div>
				<Header textColor={'extrato'} />
				<main className={styles.container}>
					<div className={styles.containerHeader}>
						<h1>Extrato</h1>
						<button>
							<FiRefreshCcw color="#3fffa3" size={25} />
						</button>
					</div>
					<article>
						<section className={styles.extrato}>
							<button>
								<div className={styles.tag}></div>
								<div className={styles.descricao}>
									<span>Entrada: {entrada}</span>
									<span>Saida: {saida}</span>
								</div>
							</button>
						</section>
					</article>
				</main>
			</div>
		</>
	);
}

export const getServerSideProps = canSSRAuth({
	fn: async (ctx: any) => {
		const apiClient = setupAPIClient(ctx);

		const response = await apiClient.get('/transacao/extrato');

		return {
			props: {
				extrato: response.data
			}
		};
	}
});
