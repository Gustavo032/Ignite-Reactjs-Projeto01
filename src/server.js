import http from "node:http"
import { json } from "./middlewares/json"

// stateful = Informação em memória para funcionar(tipo temporária)
// stateless = Informação em banco de dados para funcionar

const users = []

const server = http.createServer(async(req, res)=>{

	const { method, url } = req // exportando o método e caminho da request
	
	console.log(method, url) // imprimindo método e caminho da request

	await json(req,res) // middleware que define body da request
	
	console.log(req.body) // Imprimindo o body da request
	
	if(method === "GET" && url === "/users"){ // GET na rota "users"
		return res
		.end(JSON.stringify(users))
	}
	
	if(method === "POST" && url === "/users"){ // POST na rota "users"
		const { name, email } = req.body
		users.push({ 
			id: 1, 
			name: name, 
			email: email
		})
		return res.writeHead(201).end()
	}

	return res.writeHead(404).end()
})

server.listen(3333)