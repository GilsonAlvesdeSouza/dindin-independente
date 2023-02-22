import { canSSRAuth } from '@/utils/canSSRAuth';
import { FiRefreshCcw } from 'react-icons/fi';
import Head from 'next/head';
import { Header } from '@/components/Header';
import styles from './styles.module.scss';

export default function Dashboard() {
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
						<section className={styles.transacao}>
							<button>
								<div className={styles.tag}></div>
								<div className={styles.descricao}>
									<span>Descrição: compra doida</span>
									<span>Data: 22/02/2008</span>
									<span>Valor: R$ 100,00</span>
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
	fn: async (ctx) => {
		return {
			props: {}
		};
	}
});
