const http = require('node:http')
const fs = require('node:fs')

const desirePort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  console.log('request recibida: ', req.url)
  res.setHeader('Content-type', 'text/html; charset=utf-8')
  if (req.url === '/') {
    res.end('<h1>Pagina inicial</h1>')
  } else if (req.url === '/imagen.png') {
    fs.readFile('./imagen.png', (err, data) => {
      if (err) {
        res.statuscode = 500
        res.end('<h1>Error 500 - Interval Server Error. Image not found.</h1>')
      } else {
        res.setHeader('Content-type', 'image/png')
        res.statuscode = 200
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.end('<h1>Hola Contacto</h1>')
  } else {
    res.statuscode = 404
    res.end('<h1>Error 404 - Page not found</h1>')
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
