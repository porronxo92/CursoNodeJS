const net = require('node:net')

function findAvailablePort(desiredPort) {
	return new Promise((resolve, reject) => {
		const server = net.createServer()
		server.listen(desiredPort, () => {
			const { port } = server.address().port
			console.log(`Servidor escuchando en el puerto http://localhost:${port}`)
			server.close(() => {
				resolve(port)
			})
		})

		server.on('error', (err) => {
			if (err.code === 'EADDRINUSE') {
				console.log(`El puerto ${desiredPort} esta ocupado`)
				findAvailablePort(0).then((port) => resolve(port))
			} else {
				reject(err)
			}
		})
	})
}

module.exports = { findAvailablePort }
