import { createContext, ReactNode, useState } from "react";
import Router from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { api } from "../services/apiClient";
import { toast } from "react-toastify";
import { errorOrAxiosError } from "../helpers/errorAxios";

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
    destroyCookie(undefined, "@nextauth.token");
    Router.push("/");
  } catch {
    console.log("erro ao deslogar");
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  const signIn = async ({ email, password }: SignInProps) => {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser({ id, name, email });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Login efetuado com sucesso!");

      Router.push("/dashboard");
    } catch (error) {
      const result = errorOrAxiosError(error);
      if (result.type !== "error") {
        if (result.message === "User/password incorrect.") {
          toast.warn("Email ou senha inválidos!");
          return;
        }
      }

      toast.error("Ocorreu um erro ao efetuar o login!");
    }
  };

  const signUp = async ({ name, email, password }: SignUpProps) => {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });

      toast.success("Cadastrado com sucesso!");

      Router.push("/");
    } catch (error) {
      const result = errorOrAxiosError(error);
      if (result.type !== "error") {
        if (result.message === "User Already exists") {
          toast.warn("O email já está cadastrado!");
          return;
        }
      }

      toast.error("Ocorreu um erro ao tentar cadastrar!");
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
