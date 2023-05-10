import http from "node:http"
import { json } from "./middlewares/json.js"
import { routes } from "./routes.js"
import { extractQueryParams } from "./utils/extract-query-params.js"

// stateful = Informação em memória para funcionar(tipo temporária)
// stateless = Informação em banco de dados para funcionar

// ENVIAR INFORMAÇÕES> Query Params/ Route Params / Request Body

// queryParams = https://api:3333/users?userId=1&name=Gustavo ( preciso ter uma URL stateful [filtros, paginação, não-obrigatórios nem sensíveis] )
// routeParams = https://api:3333/users/1 - faz parte da URL/rota ( serve para identificar recursos, sem informações sensíveis )
// requestBody = https://api:3333/users/ ( envio de informações de um formulário (HTTPs) )

const server = http.createServer(async(req, res)=>{

	const { method, url } = req // exportando o método e caminho da request
	
	console.log(method, url) // imprimindo método e caminho da request

	await json(req, res) // middleware que define body da request
	
	console.log(req.body) // Imprimindo o body da request
	
	const route = routes.find(route => {
	
	
		return route.method === method && route.path.test(url) // executar regex na URL

	})

	if(route){
		const routeParams = req.url.match(route.path) //
		
		// console.log(extractQueryParams(routeParams.groups.query)) // extract

		const { query, ...params } = routeParams.groups

		req.params = params // informar a informação que está recebendo pela URL

		req.query = query ? extractQueryParams(query) : {}

		return route.handler(req,res) // EXECUTANDO A FUNÇÃO DA ROTA CORRETA
	}

	return res.writeHead(404).end()
})

server.listen(3333)