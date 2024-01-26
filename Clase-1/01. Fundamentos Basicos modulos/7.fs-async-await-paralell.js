const fs = require("node:fs/promises");
console.log("---- Asincrono paralelo ----");

Promise.all([
    fs.readFile('./archivo.txt', 'utf-8'),
    fs.readFile('./archivo2.txt', 'utf-8')
]).then(([text, text2]) => {
    console.log('Primer texto:', text)
    console.log('Segundo texto:', text2)
})