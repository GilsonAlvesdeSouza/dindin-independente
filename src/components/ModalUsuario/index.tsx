import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import setupAPIClient from '@/services/api';
import { usuarioProps } from '@/pages/usuario';

interface ModalUsuarioProps {
	isOpen: boolean;
	onRequestClose: () => void;
	usuario: usuarioProps | undefined;
}

export function ModalUsuario({
	isOpen,
	onRequestClose,
	usuario
}: ModalUsuarioProps) {
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

	const [nome, setNome] = useState(usuario?.nome);
	const [email, setEmail] = useState(usuario?.email);
	const [senha, setSenha] = useState('');

	async function handleRegister(event: FormEvent) {
		event.preventDefault();

		if ((nome && email && senha) === '') {
			toast.warn('Preencha todos os campos!');
			return;
		}

		const apiClient = setupAPIClient();

		try {
			await apiClient.put('usuario/', {
				nome,
				email,
				senha
			});
			toast.success('Dados atualizados com sucesso!');
			onRequestClose();
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
					<h1>Atualizar Usuario</h1>
					<form
						className={styles.form}
						autoComplete="false"
						onSubmit={handleRegister}
					>
						<input
							className={styles.input}
							type="text"
							placeholder="Informe o nome"
							value={nome}
							onChange={(e) => setNome(e.target.value)}
						/>
						<input
							className={styles.input}
							type="email"
							placeholder="Informe o email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							className={styles.input}
							type="password"
							placeholder="Informe a senha"
							value={senha}
							onChange={(e) => setSenha(e.target.value)}
						/>
						<button className={styles.buttonAdd} type="submit">
							Atualizar
						</button>
					</form>
				</main>
			</div>
		</Modal>
	);
}
