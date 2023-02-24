export const formatDate = (date: Date) => {
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();

	return `${year}-${month < 10 ? `0${month + 1}` : `${month + 1}`}-${
		day < 10 ? `0${day}` : `${day}`
	}`;
};
export const formatDateReverse = (date: Date) => {
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();

	return `${day < 10 ? `0${day}` : `${day}`}-${
		month < 10 ? `0${month + 1}` : `${month + 1}`
	}-${year}`;
};
