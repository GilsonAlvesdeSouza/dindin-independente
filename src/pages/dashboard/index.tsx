import { useState } from 'react';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { FiRefreshCcw } from 'react-icons/fi';
import Head from 'next/head';
import { Header } from '@/components/Header';
import styles from './styles.module.scss';
import setupAPIClient from '@/services/api';

type transacoesProps = {
	id: number;
	tipo: string;
	descricao: string;
	valor: number;
	data: string;
	usuario_id: number;
	categoria_id: number;
	categoria_nome: string;
};

interface HomeProps {
	transacoes: transacoesProps[];
}

export default function Dashboard({ transacoes }: HomeProps) {
	const [listaTransacoes, setListaTransacoes] = useState(transacoes || []);

	return (
		<>
			<Head>
				<title>Painel Dindin</title>
			</Head>
			<div>
				<Header />
				<main className={styles.container}>
					<div className={styles.containerHeader}>
						<h1>Ultimas Transações</h1>
						<button>
							<FiRefreshCcw color="#3fffa3" size={25} />
						</button>
					</div>
					<article className={styles.listTransacoes}>
						{listaTransacoes.map((item) => (
							<section
								key={`transacao-${item.id}`}
								className={styles.transacao}
							>
								<button>
									<div className={styles.tag}></div>
									<div className={styles.descricao}>
										<span>Descrição: {item.descricao}</span>
										<span>Data: {item.data}</span>
										<span>Valor: {item.valor}</span>
									</div>
								</button>
							</section>
						))}
					</article>
				</main>
			</div>
		</>
	);
}

export const getServerSideProps = canSSRAuth({
	fn: async (ctx: any) => {
		const apiClient = setupAPIClient(ctx);

		const response = await apiClient.get('/transacao');

		return {
			props: {
				transacoes: response.data
			}
		};
	}
});
