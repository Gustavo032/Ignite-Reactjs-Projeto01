import http from "node:http"
import { Database } from "./database.js"
import { json } from "./middlewares/json.js"

// stateful = Informação em memória para funcionar(tipo temporária)
// stateless = Informação em banco de dados para funcionar

const database = new Database()

database.database

const server = http.createServer(async(req, res)=>{

	const { method, url } = req // exportando o método e caminho da request
	
	console.log(method, url) // imprimindo método e caminho da request

	await json(req, res) // middleware que define body da request
	
	console.log(req.body) // Imprimindo o body da request
	
	if(method === "GET" && url === "/users"){ // GET na rota "users"
		const users = database.select('users')

		return res.end(JSON.stringify(users)) // lista os usuários no DB
	}
	
	if(method === "POST" && url === "/users"){ // POST na rota "users"
		const { name, email } = req.body
		
		const user = { 
			id: 1, 
			name, 
			email,
		}
		
		database.insert("users", user)// registra os usuários no DB
		
		return res.writeHead(201).end()
	}

	return res.writeHead(404).end()
})

server.listen(3333)