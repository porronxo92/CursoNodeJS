import { readFile } from 'node:fs/promises'

console.log('---- Asincrono secuencial con await con mjs ----')

console.log('LEYENDO 1º ARCHIVO')
//Este evento te devuelve un buffer de memoria de bytes de la informacion
const text = await readFile('./archivo.txt', 'utf-8')
console.log('Primer texto:', text)

console.log('---> Hacer cosas mientras')
console.log('LEYENDO 2º ARCHIVO')

const text2 = await readFile('./archivo2.txt', 'utf-8')
console.log('segundo texto:', text2)