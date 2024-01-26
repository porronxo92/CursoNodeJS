//Process - objeto de NodeJS que proporciona informacion y control sobre el proceso que se esta ejecutando actualmente
//propiedades y metodos que permite interactuar

console.log(process.argv)


//Current working directory -- desde donde estamos ejecutando el proceso (archivo)
console.log('Directorio actual archivo:', process.cwd())

//uso de variables de entorno
console.log(process.env.PEPITO)