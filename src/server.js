// Aplicações HTTP = api.
import http from "node:http"
// commonJS = require
// ESmodules = import/export 

// import http from "node:http" // modulo interno
// import fastify from "fastify" // modulo terceiro 


// criar um usuário
const server = http.createServer((req, res)=>{

	const { method, url } = req
	console.log(method, url)
	return res.end("hello ignite")
})

server.listen(3333)