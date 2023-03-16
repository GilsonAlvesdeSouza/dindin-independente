import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';

import styles from './styles.module.scss';
import dolar from '../../../public/dolar.png';

type colorTextNav = {
	textColor?: string
}

export function Header({ textColor }:colorTextNav) {
	const { signOut } = useContext(AuthContext);
	
	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<Link href="/dashboard" legacyBehavior>
					<div className={styles.menuIcon}>
						<Image src={dolar} alt="Logo Dindin" width={40} height={40} />
						<a
							style={
								textColor == 'home'
									? { color: '#3fffa3' }
									: { color: 'white' }
							}
						>
							Home
						</a>
					</div>
				</Link>

				<nav className={styles.menuNav}>
					<Link href="/transacoes" legacyBehavior>
						<a
							style={
								textColor == 'transacoes'
									? { color: '#3fffa3' }
									: { color: 'white' }
							}
						>
							Transações
						</a>
					</Link>
					<Link href="/extrato" legacyBehavior>
						<a
							style={
								textColor == 'extrato' ? { color: '#3fffa3' } : { color: 'white' }
							}
						>
							Extrato
						</a>
					</Link>
					<Link href="/categorias" legacyBehavior>
						<a
							style={
								textColor == 'categorias'
									? { color: '#3fffa3' }
									: { color: 'white' }
							}
						>
							Categorias
						</a>
					</Link>
					<Link href="/usuario" legacyBehavior>
						<a
							style={
								textColor == 'usuario' ? { color: '#3fffa3' } : { color: 'white' }
							}
						>
							Usuário
						</a>
					</Link>
					<button onClick={signOut}>
						<FiLogOut size={24} />
					</button>
				</nav>
			</div>
		</header>
	);
}
