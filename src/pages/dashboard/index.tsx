import { useState } from 'react';
import Modal from 'react-modal';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { FiRefreshCcw } from 'react-icons/fi';
import Head from 'next/head';
import { Header } from '@/components/Header';
import styles from './styles.module.scss';
import setupAPIClient from '@/services/api';
import { ModalTransacoes } from '@/components/ModalTransacoes';
import { formatDate, formatDateReverse } from '@/utils/DateFormat';
import { toast } from 'react-toastify';

export type transacoesProps = {
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
	const [modalItem, setModalItem] = useState<transacoesProps>();
	const [modalVisible, setModalVisible] = useState(false);

	function handleCloseModal() {
		setModalVisible(false);
	}

	async function handleResetTransacoes() {
		const apiClient = setupAPIClient();

		const response = await apiClient.get('/transacao');
		setListaTransacoes(response.data);
	}

	async function handleOpenModal(id: number) {
		const apiClient = setupAPIClient();

		const response = await apiClient.get(`/transacao/${id}`);
		setModalItem(response.data);
		console.log(response.data);
		setModalVisible(true);
	}

	Modal.setAppElement('#__next');
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
						<button onClick={() => handleResetTransacoes()}>
							<FiRefreshCcw color="#3fffa3" size={25} />
						</button>
					</div>
					<article className={styles.listTransacoes}>
						{listaTransacoes.map((item) => (
							<section
								onClick={() => handleOpenModal(Number(item.id))}
								key={`transacao-${item.id}`}
								className={styles.transacao}
							>
								<div className={styles.tag}></div>
								<div className={styles.descricao}>
									<span>Tipo: {item.tipo}</span>
									<span>Descrição: {item.descricao}</span>
									<span>Valor: {item.valor}</span>
									<span>Categoria: {item.categoria_nome}</span>
									<span>Data: {formatDateReverse(new Date(item.data))}</span>
								</div>
							</section>
						))}
					</article>
				</main>
				{modalVisible && (
					<ModalTransacoes
						isOpen={modalVisible}
						onRequestClose={handleCloseModal}
						transacao={modalItem}
						resetTransacoes={handleResetTransacoes}
					/>
				)}
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
