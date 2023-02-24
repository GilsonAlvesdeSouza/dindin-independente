import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import { transacoesProps } from '@/pages/dashboard';
import { formatDate } from '@/utils/DateFormat';
import setupAPIClient from '@/services/api';

type CategoriaProps = {
	id: number;
	descricao: string;
};

interface ModalTransacoesProps {
	isOpen: boolean;
	onRequestClose: () => void;
	transacao: transacoesProps | undefined;
	resetTransacoes: () => void;
}

export function ModalTransacoes({
	isOpen,
	onRequestClose,
	transacao,
	resetTransacoes
}: ModalTransacoesProps) {
	const customStyles = {
		content: {
			top: '50%',
			bottom: 'auto',
			left: '50%',
			right: 'auto',
			padding: '30px',
			transform: 'translate(-50%, -50%)',
			backgroundColor: '#1d1d2e'
		}
	};

	const date = formatDate(new Date(String(transacao?.data)));
	const [tipo, setTipo] = useState(transacao?.tipo);
	const [descricao, setDescricao] = useState(transacao?.descricao);
	const [valor, setValor] = useState(String(transacao?.valor));
	const [data, setData] = useState(date);
	const [categoria, setCategoria] = useState(String(transacao?.categoria_id));
	const [listaCategorias, setListaCategorias] = useState<CategoriaProps[]>([]);

	useEffect(() => {
		async function buscarCategorias() {
			const apiClient = setupAPIClient();

			const response = await apiClient.get('/categoria');
			setListaCategorias(response.data);
		}
		buscarCategorias();
	}, []);

	const handleCategorias = () => {
		return listaCategorias.map((item) => (
			<option key={`categoria-${item.id}`} value={item.id}>
				{item.descricao}
			</option>
		));
	};

	async function handleRegister(event: FormEvent) {
		event.preventDefault();
		if (tipo === '0') {
			toast.warning('escolha um tipo!');
			return;
		}

		if (descricao === '') {
			toast.warning('É preciso informar uma descricao!');
			return;
		}

		if (valor === '') {
			toast.warning('É preciso informar um valor!');
			return;
		}

		if (data === '') {
			toast.warning('É preciso informar uma data!');
			return;
		}

		if (categoria === '0') {
			toast.warning('Escolha uma categoria!');
			return;
		}

		const apiClient = setupAPIClient();

		try {
			await apiClient.put(`transacao/${Number(transacao?.id)}`, {
				tipo,
				descricao,
				valor,
				data,
				categoria_id: categoria
			});
			toast.success('Dados atualizados com sucesso!');
			onRequestClose();
			resetTransacoes();
		} catch (error) {
			console.log(error);
			toast.error('Ocorreu um erro ao salvar os dados!');
		}
	}

	return (
		<Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
			<button
				type="button"
				onClick={onRequestClose}
				className="react-modal-close"
				style={{ background: 'transparent', border: 0 }}
			>
				<FiX size={45} color="#f34748" />
			</button>
			<div>
				<main className={styles.container}>
					<h1>Atualizar Transações</h1>
					<form
						className={styles.form}
						autoComplete="false"
						onSubmit={handleRegister}
					>
						<select
							className={styles.select}
							name="tipo"
							id=""
							value={tipo}
							onChange={(e) => setTipo(e.target.value)}
						>
							<option value="0">Escolha uma Tipo</option>
							<option value="entrada">entrada</option>
							<option value="saida">saida</option>
						</select>
						<input
							className={styles.input}
							type="text"
							placeholder="Informe a descrição"
							value={descricao}
							onChange={(e) => setDescricao(e.target.value)}
						/>
						<input
							className={styles.input}
							type="text"
							placeholder="Informe a valor"
							value={valor}
							onChange={(e) => setValor(e.target.value)}
						/>
						<input
							className={styles.input}
							type="date"
							placeholder="Informe a data"
							value={data}
							onChange={(e) => setData(e.target.value)}
						/>
						<select
							className={styles.select}
							name="Categoria"
							id=""
							value={categoria}
							onChange={(e) => {
								setCategoria(e.target.value);
							}}
						>
							<option value="0">Escolha uma Categoria</option>
							{handleCategorias()}
						</select>
						<button className={styles.buttonAdd} type="submit">
							Atualizar
						</button>
					</form>
				</main>
			</div>
		</Modal>
	);
}
