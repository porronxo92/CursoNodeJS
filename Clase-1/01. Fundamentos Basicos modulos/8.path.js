const path = require('node:path')
const fs = require('node:fs')

//barra separadora de carpetas segun SO
console.log('Separador SO: ', path.sep)

//Unir rutas con path.join 
const juntarrutas = path.join('content','subfolder','nombrearchivo.txt')
//nombre del fichero de la ruta
const base = path.basename(juntarrutas)
//devuelve la extension del fichero
const extension = path.extname(juntarrutas)

console.log(juntarrutas)
console.log(base)
console.log(extension)

