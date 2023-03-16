import { useState } from 'react';
import Modal from 'react-modal';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { FiRefreshCcw } from 'react-icons/fi';
import Head from 'next/head';
import { Header } from '@/components/Header';
import styles from './styles.module.scss';
import setupAPIClient from '@/services/api';
import { ModalUsuario } from '@/components/ModalUsuario';

export type usuarioProps = {
	id: number;
	nome: string;
	email: string;
};

interface HomeProps {
	usuarioResponse: usuarioProps;
}

export default function Dashboard({ usuarioResponse }: HomeProps) {
	const [usuario, setUsuario] = useState(usuarioResponse);
	const [modalVisible, setModalVisible] = useState(false);

	function handleCloseModal() {
		setModalVisible(false);
	}

	function handleOpenModal() {
		setModalVisible(true);
	}

	Modal.setAppElement('#__next');
	return (
		<>
			<Head>
				<title>Painel Dindin</title>
			</Head>
			<div>
				<Header textColor={'usuario'}/>
				<main className={styles.container}>
					<div className={styles.containerHeader}>
						<h1>Detalhes do Usuário</h1>
						<button>
							<FiRefreshCcw color="#3fffa3" size={25} />
						</button>
					</div>
					<article className={styles.containerUsuario}>
						<section
							className={styles.usuario}
							onClick={() => handleOpenModal()}
						>
							<button>
								<div className={styles.tag}></div>
								<div className={styles.descricao}>
									<span>Código: {usuario.id}</span>
									<span>Nome: {usuario.nome}</span>
									<span>Email: {usuario.email}</span>
								</div>
							</button>
						</section>
					</article>
				</main>
				{modalVisible && (
					<ModalUsuario
						isOpen={modalVisible}
						onRequestClose={handleCloseModal}
						usuario={usuario}
					/>
				)}
			</div>
		</>
	);
}

export const getServerSideProps = canSSRAuth({
	fn: async (ctx: any) => {
		const apiClient = setupAPIClient(ctx);

		const response = await apiClient.get('/usuario');

		return {
			props: {
				usuarioResponse: response.data
			}
		};
	}
});
