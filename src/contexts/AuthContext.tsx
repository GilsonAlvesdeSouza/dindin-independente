import { createContext, ReactNode, useState } from 'react';
import Router from 'next/router';
import { destroyCookie, setCookie } from 'nookies';
import { api } from '@/services/apiCliente';
import { toast } from 'react-toastify';
import { errorOrAxiosError } from '@/helpers/errorAxios';

type AuthContextData = {
	user: UserProps | undefined;
	isAuthenticated: boolean;
	signIn: (credential: SignInProps) => Promise<void>;
	signOut: () => void;
	signUp: (credentials: SignUpProps) => Promise<void>;
};

type UserProps = {
	id: string;
	name: string;
	email: string;
};

type SignInProps = {
	email: string;
	password: string;
};

type SignUpProps = {
	name: string;
	email: string;
	password: string;
};

type AuthProviderProps = {
	children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export const signOut = () => {
	try {
		destroyCookie(undefined, '@dindin.token');
		Router.push('/');
	} catch {
		console.log('erro ao deslogar');
	}
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<UserProps>();
	const isAuthenticated = !!user;

	const signIn = async ({ email, password }: SignInProps) => {
		try {
			const response = await api.post('/login', {
				email,
				senha: password
			});

			const {
				usuario: { id, nome },
				token
			} = response.data;

			setCookie(undefined, '@dindin.token', token, {
				maxAge: 60 * 60,
				path: '/'
			});

			setUser({ id, name: nome, email });

			api.defaults.headers['Authorization'] = `Bearer ${token}`;

			toast.success('Login efetuado com sucesso!');

			Router.push('/dashboard');
		} catch (error) {
			const result = errorOrAxiosError(error);
			console.log('result =>', result);
			if (result.type !== 'error') {
				if (result.message === 'Usuário e/ou senha inválido(s).') {
					toast.warn('Email ou senha inválidos!');
					return;
				}
			}
			toast.error('Ocorreu um erro ao efetuar o login!');
		}
	};

	const signUp = async ({ name, email, password }: SignUpProps) => {
		try {
			const response = await api.post('/usuario', {
				nome: name,
				email,
				senha: password
			});
			toast.success('Cadastrado com sucesso!');
			console.log(response.data);
			Router.push('/');
		} catch (error) {
			console.log('Ocorreu um erro: ', error);
			const result = errorOrAxiosError(error);
			if (result.type !== 'error') {
				if (
					result.message ===
					'Já existe usuário cadastrado com o e-mail informado.'
				) {
					toast.warn('O email já está cadastrado!');
					return;
				}
			}
			toast.error('Ocorreu um erro ao tentar cadastrar!');
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, signIn, signOut, signUp }}
		>
			{children}
		</AuthContext.Provider>
	);
};
