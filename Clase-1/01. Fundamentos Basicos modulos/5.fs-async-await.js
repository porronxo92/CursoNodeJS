const fs = require('node:fs/promises')
console.log('---- Asincrono secuencial con await con Common JS----')

async function init(){
    console.log('LEYENDO 1º ARCHIVO')
    //Este evento te devuelve un buffer de memoria de bytes de la informacion
    const text = await fs.readFile('./archivo.txt', 'utf-8')
    console.log('haciendo cosas')
    console.log('Primer texto:', text)
    
    console.log('---> Hacer cosas mientras')
    console.log('LEYENDO 2º ARCHIVO')
    
    const text2 = await fs.readFile('./archivo2.txt', 'utf-8')
    console.log('segundo texto:', text2)

}
init()