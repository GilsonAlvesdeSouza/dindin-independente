import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '../../public/dolar.png';
import styles from '@/styles/home.module.scss';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Home() {
	return (
		<>
			<Head>
				<title>DinDin</title>
			</Head>
			<div className={styles.containerCenter}>
				<Link href="/signup" legacyBehavior>
					<div className={styles.logo}>
						<Image src={logoImg} alt="Logo Dindin" width={40} height={40} />
						<span>Dindin Cubos Ifood</span>
					</div>
				</Link>
				<div className={styles.login}>
					<h1>Login</h1>
					<form action="">
						<Input placeholder="Digite seu email" type="text" />
						<Input placeholder="Digite sua senha" type="password" />
						<Button type="submit" loading={false}>
							Acessar
						</Button>
					</form>
					<Link href="/signup" legacyBehavior>
						<a className={styles.text}>Não possui uma consta? Cadastre-se</a>
					</Link>
				</div>
			</div>
		</>
	);
}
