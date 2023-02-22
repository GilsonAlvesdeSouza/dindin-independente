import { FormEvent, useState } from 'react';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { toast } from 'react-toastify';
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

export default function Category({ categorias }: HomeProps) {
	const [tipo, setTipo] = useState('');
	const [descricao, setDescricao] = useState('');
	const [valor, setValor] = useState('');
	const [data, setData] = useState('');
	const [categoria, setCategoria] = useState('');
	const [listaCategorias, setListaCategorias] = useState(categorias || []);

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
			await apiClient.post('/transacao', {
				tipo,
				descricao,
				valor,
				data,
				categoria_id: categoria
			});
			toast.success('Dados salvos com sucesso!');
			setTipo('0');
			setDescricao('');
			setValor('');
			setData('');
			setCategoria('0');
		} catch (error) {
			console.log(error);
			toast.error('Ocorreu um erro ao salvar os dados!');
		}
	}

	const handleCategorias = () => {
		return listaCategorias.map((item) => (
			<option key={`categoria-${item.id}`} value={item.id}>
				{item.descricao}
			</option>
		));
	};

	return (
		<>
			<Head>
				<title>Transações</title>
			</Head>
			<Header />
			<main className={styles.container}>
				<h1>Cadastrar Transações</h1>
				<form
					className={styles.form}
					autoComplete="false"
					onSubmit={handleRegister}
				>
					<select
						className={styles.input}
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
						type=""
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
						className={styles.input}
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
						Cadastrar
					</button>
				</form>
			</main>
		</>
	);
}

export const getServerSideProps = canSSRAuth({
	fn: async (ctx: any) => {
		const apiClient = setupAPIClient(ctx);
		const response = await apiClient.get('/categoria');

		return {
			props: {
				categorias: response.data
			}
		};
	}
});
