import http from "node:http"

// - Criar um usuário
// - Remover um usuário
// - Listagem de usuários 
// - Edição de usuários

// - HTTP
//	 	- Método HTTP
// 		- URL 


// GET, POST, PUT, PATCH, DELETE

// GET => Buscar uma informação no backend
// Post => Criar uma informação no backend
// Put => Editar um recurso no backend (atualizar varios ao mesmo tempo(geral))
// Patch => Atualizar um recurso no backend (atualizar uma informação especifica(tipo um toggle de aceito os termos)
// DELETE => Deletar um recurso no backend

const server = http.createServer((req, res)=>{

	const { method, url } = req
	console.log(method, url)
	
	if(method === "GET" && url === "/users"){
		return res.end("Listagem de usuários")
	}
	
	if(method === "POST" && url === "/users"){
		return res.end("Criação de usuário")
	}

	return res.end("hello ignite")
})

server.listen(3333)