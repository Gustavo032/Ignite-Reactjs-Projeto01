import http from "node:http"

// stateful = Informação em memória para funcionar(tipo temporária)
// stateless = Informação em banco de dados para funcionar

const users = []

const server = http.createServer(async(req, res)=>{

	const { method, url } = req
	console.log(method, url)

	const buffers = []

	for await (const chunk of req){
		buffers.push(chunk)
	}
	try {	
		req.body = JSON.parse(Buffer.concat(buffers).toString())
	} catch {
		req.body = null
	}
	
	console.log(req.body)
	
	if(method === "GET" && url === "/users"){
		return res
		.setHeader("Content-Type", "application/json")
		.end(JSON.stringify(users))
	}
	
	if(method === "POST" && url === "/users"){
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