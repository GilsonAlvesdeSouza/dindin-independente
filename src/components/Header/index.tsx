import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';

import styles from './styles.module.scss';
import dolar from '../../../public/dolar.png';

export function Header() {
	const { signOut } = useContext(AuthContext);

	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<Link href="/dashboard">
					<Image src={dolar} alt="Logo Dindin" width={40} height={40} />
				</Link>
				<nav className={styles.menuNav}>
					<Link href="/transacoes" legacyBehavior>
						<a>Transações</a>
					</Link>
					<Link href="/categorias" legacyBehavior>
						<a>Categorias</a>
					</Link>
					<Link href="/usuarios" legacyBehavior>
						<a>Usuários</a>
					</Link>
					<button onClick={signOut}>
						<FiLogOut size={24} />
					</button>
				</nav>
			</div>
		</header>
	);
}
