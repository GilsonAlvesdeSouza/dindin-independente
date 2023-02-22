import { FormEvent, useContext, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Image from 'next/image';
import logoImg from '../../public/dolar.png';
import styles from '@/styles/home.module.scss';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AuthContext } from '@/contexts/AuthContext';
import { canSSRGuest } from '@/utils/canSSRGues';

export default function Home() {
	const { signIn } = useContext(AuthContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleLogin(event: FormEvent) {
		event.preventDefault();

		if (email == '' || password == '') {
			toast.warn('Prencha todos os dados!');
			return;
		}

		setLoading(true);

		signIn({ email, password });

		setLoading(false);
	}

	return (
		<>
			<Head>
				<title>DinDin</title>
			</Head>
			<div className={styles.containerCenter}>
				<div className={styles.logo}>
					<Image src={logoImg} alt="Logo Dindin" width={40} height={40} />
					<span>Dindin</span>
					<h1 className={styles.colorCubos}>Cubos</h1>
					<span>/</span>
					<span className={styles.colorIfood}>Ifood</span>
				</div>

				<div className={styles.login}>
					<h1>Login</h1>
					<form onSubmit={handleLogin} autoComplete="nope">
						<Input
							placeholder="Digite seu email"
							type="email"
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setEmail(e.target.value)
							}
						/>
						<Input
							placeholder="Digite sua senha"
							type="password"
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setPassword(e.target.value)
							}
						/>
						<Button type="submit" loading={loading}>
							Acessar
						</Button>
					</form>
					<Link href="/signup" legacyBehavior>
						<a className={styles.text}>Não possui uma conta? Cadastre-se</a>
					</Link>
				</div>
			</div>
		</>
	);
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
	return {
		props: {}
	};
});
