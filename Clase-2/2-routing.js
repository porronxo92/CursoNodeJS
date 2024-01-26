const http = require('node:http')

const desirePort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  const { method, url } = req
  res.setHeader('Content-type', 'text/html; charset=utf-8')
  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          return res.end()
        default:
          res.statuscode = 404
          res.end('<h1>Error 404 - Page not found</h1>')
      }
      break
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          req.on('data', (chunk) => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statuscode = 404
          res.end('<h1>Error 404 - Page not found</h1>')
      }
      break
  }
}
const server = http.createServer(processRequest)

// Status Code
/*
  100-199 => Respuestas informativas
  200-299 => Respuestas satisfactorias
  300-399 => Redirecciones
  400-499 => Errores del cliente
  500-599 => Errores del servidor
*/

// puerto 0: asigna el primer puerto que esta disponible
server.listen(desirePort, () => {
  console.log(`Server listening port => http://localhost:${desirePort}`)
})
