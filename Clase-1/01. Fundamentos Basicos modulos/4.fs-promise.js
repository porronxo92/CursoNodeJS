const fs = require('node:fs/promises')

console.log('---- Asincrono con Promesas ----')


console.log('LEYENDO 1º ARCHIVO')
//Este evento te devuelve un buffer de memoria de bytes de la informacion
fs.readFile('./archivo.txt', 'utf-8')
.then(text=>{
    console.log('Primer texto:', text)
})

console.log('LEYENDO 2º ARCHIVO')

fs.readFile('./archivo2.txt', 'utf-8')
.then(text=>{
    console.log('Segundo texto:', text)
})