export const convertNumberToShow = (pValue) => {
	const numberConverted = pValue / 1
	return !Number.isInteger(numberConverted)
		? numberConverted
		: parseFloat(numberConverted.toFixed(2))
}

export const formatValueToShow = (pValue) => {
	return convertNumberToShow(pValue).toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}