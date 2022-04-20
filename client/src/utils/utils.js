export function stringToObject(data) {
	return Object.fromEntries(data.split(',').map(item => item.split(':')));
}