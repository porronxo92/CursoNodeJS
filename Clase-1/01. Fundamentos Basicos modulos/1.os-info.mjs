import os from 'node:os'

console.log('Informacion del sistema operativo')
console.log('-----------------')
console.log('Nombre del SO', os.platform())
console.log('Version SO', os.release())
console.log('Arq ', os.arch())
console.log('CPUs ', os.cpus())
console.log('NUMERO CPUs ', os.cpus().length)
console.log('Memoria Libre', os.freemem()/1024/1024)
console.log('Memoria TOTAL', os.totalmem()/1024/1024)
console.log('Uptime', os.uptime()/60/60/24)
console.log('-----------------')
console.log()
