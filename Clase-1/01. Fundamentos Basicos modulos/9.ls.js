const path = require("node:path");
const fs = require("node:fs/promises");

const folder = process.argv[2] ?? '.'
console.log('Directorio a procesar: ', folder)
ls(folder)

async function ls(folder){
    let files
    //Buenas practicas es segmentar los try-catch para poder modularizar las funcioanlidades del codigo. 
    try {
        files = await fs.readdir(folder)
    } catch (error) {
        console.error("no se ha podido leer el directorio:", folder)
        console.error(error)
        process.exit(1) //salir de forma controlada pero sabiendo que tenemos un error
    }
    //el map ejecuta y crea las promesas en paralelo, se lanzan todas a la vez de cada file del array files
    //en cambio el forEach si que lanza en secuencial, y espera a que una promesa acabe de crearse para lanzar la siguiente
    const filesPromises = files.map(async file => {
        const filePath = path.join(folder, file)
        let fileStat
        try {
            fileStat = await fs.stat(filePath) //stat te da la informacion del archivo/directorio que le pasas
        } catch (error) {
            console.error("no se ha obtener informacion del archivo:", filePath)
            console.error(error)
            process.exit(1)
        }
        const fileType = fileStat.isDirectory() ? 'D' : 'F'
        const fileSize = fileStat.size //bytes
        const fileModified = fileStat.mtime.toLocaleString()
        return (`${fileType}: ${file.padEnd(50)} ${fileSize.toString().padStart(20)} ${fileModified}`)        
    })

    const filesInfo = await Promise.all(filesPromises)
    filesInfo.forEach(fileInfo => console.log(fileInfo))
}





