export const convertNumberToShow = (pValue) => {
	const numberConverted = pValue / 1000
	return !Number.isInteger(numberConverted)
		? numberConverted
		: parseFloat(numberConverted.toFixed(4))
}

export const formatValueToShow = (pValue) => {
	return convertNumberToShow(pValue).toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 3,
		maximumFractionDigits: 3,
	})
}