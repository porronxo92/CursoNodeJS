const fs = require('node:fs')

console.log('---- Asincrono con Callbacks ----')
console.log('LEYENDO 1º ARCHIVO')
//Este evento te devuelve un buffer de memoria de bytes de la informacion
fs.readFile('./archivo.txt', 'utf-8', (err, text)=>{
    console.log(text)
})

console.log('LEYENDO 2º ARCHIVO')

fs.readFile('./archivo2.txt', 'utf-8', (err, text)=>{
    console.log(text)
})
