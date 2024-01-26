const http = require('node:http')
const { findAvailablePort } = require('./free-port.js')

const server = http.createServer((req, res) => {
	console.log('request recibida')
	res.end('Hola Server')
})

findAvailablePort(49674).then((port) => {
	server.listen(port, () => {
		console.log(`Server listening port => http://localhost:${server.address().port}`)
	})
})

//puerto 0: asigna el primer puerto que esta disponible
// server.listen(findAvailablePort(49674), () => {
// 	console.log(`Servidor escuchando en el puerto http://localhost:${server.address().port}`)
// })
