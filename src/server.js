import http from "node:http"

// stateful = Informação em memória para funcionar(tipo temporária)
// stateless = Informação em banco de dados para funcionar

const users = []

const server = http.createServer((req, res)=>{

	const { method, url } = req
	console.log(method, url)
	
	if(method === "GET" && url === "/users"){
		
		return res
			.setHeader("Content-Type", "application/json")
			.end(JSON.stringify(users))
	}
	
	if(method === "POST" && url === "/users"){
		users.push({ 
			id: 1, 
			name: "John", 
			email: "john@example.com"
		})
		return res.end("Criação de usuário")
	}

	return res.end("hello ignite")
})

server.listen(3333)