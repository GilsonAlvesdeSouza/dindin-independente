import { useState } from 'react';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { FiRefreshCcw } from 'react-icons/fi';
import Head from 'next/head';
import { Header } from '@/components/Header';
import styles from './styles.module.scss';
import setupAPIClient from '@/services/api';

type categoriaProps = {
	id: number;
	descricao: string;
};

interface HomeProps {
	categorias: categoriaProps[];
}

export default function Dashboard({ categorias }: HomeProps) {
	const [listaCategorias] = useState(categorias || []);

	return (
		<>
			<Head>
				<title>Painel Dindin</title>
			</Head>
			<div>
				<Header />
				<main className={styles.container}>
					<div className={styles.containerHeader}>
						<h1>Lista de Categorias</h1>
						<button>
							<FiRefreshCcw color="#3fffa3" size={25} />
						</button>
					</div>
					<article className={styles.listCategorias}>
						{listaCategorias.map((item) => (
							<section
								key={`transacao-${item.id}`}
								className={styles.categoria}
							>
								<button>
									<div className={styles.tag}></div>
									<div className={styles.descricao}>
										<span>Código: {item.id}</span>
										<span>Descrição: {item.descricao}</span>
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

		const response = await apiClient.get('/Categoria');

		return {
			props: {
				categorias: response.data
			}
		};
	}
});
