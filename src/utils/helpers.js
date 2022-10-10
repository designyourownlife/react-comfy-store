export const formatPrice = (number) => {
	return Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(number/100)
}

export const getUniqueValues = (data, type) => {
	let uniqueValues = data.map(item => item[type])
	if (type === 'colors') {
		uniqueValues = uniqueValues.flat()
	}
	uniqueValues = new Set(uniqueValues)
	return ['all', ...uniqueValues]
}
