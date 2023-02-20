import Head from 'next/head';
import Image from 'next/image';
import logoImg from '../../public/dolar.png';
import styles from '@/styles/Home.module.scss';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Home() {
	return (
		<>
			<Head>
				<title>DinDin</title>
			</Head>
			<div className={styles.containerCenter}>
				<div className={styles.logo}>
					<Image src={logoImg} alt="Logo Dindin" width={40} height={40} />
					<span>Dindin</span>
				</div>
				<div className={styles.login}>
					<form action="">
						<Input placeholder="Digite seu email" type="text" />
						<Input placeholder="Digite sua senha" type="password" />
						<Button type="submit" loading={true}>
							Acessar
						</Button>
					</form>
				</div>
			</div>
		</>
	);
}
