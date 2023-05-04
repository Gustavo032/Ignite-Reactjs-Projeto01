// /users/:id

export function buildRoutePath(path){
	const routeParametersRegex = /:([a-zA-Z]+)/g
	const pathWithParametersRegex = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
	

	const pathRegex = new RegExp(`^${pathWithParametersRegex}`)


	console.log(Array.from(path.matchAll(routeParametersRegex)))
	return pathRegex
}