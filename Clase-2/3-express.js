const express = require('express')
const app = express()
app.disable('x-powered-by') // por temas de seguridad es importante deshabilitarlo.
const PORT = process.env.PORT ?? 1234

app.use(express.json()) // Esto hace lo mismo que 'Primer Middleware'

// Middleware
app.use((req, res, next) => {
  console.log('Primer middleware')
  /* El middleware sirve para ejecutar alguna accion o funcionalidad previa a ejecutar el method POST, GET...
   por el que ha entrado la peticion, de esta forma el middleware podemos revisar el usuario logado,
   o si estan todos los campos informados para la peticion y darle paso con next().
   Ejemplo de Middleware
   */
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()
  // Este codigo de abajo solo se ejecuta para POST con content-type = application/json
  let body = ''

  req.on('data', (chunk) => {
    body += chunk.toString()
  })
  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    req.body = data
    next()
  })
  next()
})

app.get('/', (req, res) => {
  res.send('<h1>Pagina inicial. Express</h1>')
})

app.post('/pokemon', (req, res) => {
  res.json(req.body)
})

// ponerla al final, tiene que ir en orden por si alguna peticion falla. Mostrar el 404
app.use((req, res) => {
  res.status(404).send('ERROR 404. Not found.')
})

app.listen(PORT, () => {
  console.log(`Server listening port => http://localhost:${PORT}`)
})
