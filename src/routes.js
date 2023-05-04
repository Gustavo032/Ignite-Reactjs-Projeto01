import { Database } from "./database.js"
import { randomUUID } from "node:crypto"
import { buildRoutePath } from "./utils/build-route-path.js"


const database = new Database()


export const routes = [
	{
		method: 'GET', // Método
		path: buildRoutePath('/users'), // diretório/URL
		handler: (req, res) => {
			const users = database.select('users') // variável com todos os dados da tabela

			return res.end(JSON.stringify(users)) // lista os usuários no DB
		}
	},
	{
		method: 'POST', // Método
		path: buildRoutePath('/users'), // diretório/URL
		handler: (req, res) => {
			const { name, email } = req.body // exportando/desestruturando o usuário no corpo da req
			
			const user = {  				// Montando Objeto do usuário com UUID
				id: randomUUID(), 
				name, 
				email,
			}
			
			database.insert("users", user) // registra os usuários no DB (tabela, dados)
			
			return res.writeHead(201).end() // respondendo "Created successfully"
		}
	},
	{
		method: 'DELETE', // Método
		path: buildRoutePath('/users/:id'), // diretório/URL
		handler: (req, res) => {
			const { id } = req.params

			database.delete('users', id) 

			console.log(req.params.id)

			return res.writeHead(204).end()
		},
	}
]