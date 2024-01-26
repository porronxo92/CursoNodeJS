const fs = require('node:fs')

console.log('---- Sincrono ----')
console.log('LEYENDO 1º ARCHIVO')
//Este evento te devuelve un buffer de memoria de bytes de la informacion
const text = fs.readFileSync('./archivo.txt', 'utf-8')
    console.log(text)

console.log('LEYENDO 2º ARCHIVO')

const text2 = fs.readFileSync('./archivo2.txt', 'utf-8')
    console.log(text2)

