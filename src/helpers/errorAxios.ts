import axios, { AxiosError } from 'axios';

export const errorOrAxiosError = (error: unknown) => {
	const result = error as Error | AxiosError;

	if (!axios.isAxiosError(result)) {
		return { message: result.message, type: 'error' };
	}
	return { message: result.response?.data.mensagem, type: 'axiosError' };
};
