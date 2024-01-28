import { Router } from 'express'

import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router()
//Todos los recursos se identifican con una URL, por lo que todo lo que se requiera de las MOVIES se identifica con /movies
//queryParam, los valores de los parametros que vienen indicados con ?
moviesRouter.get('/', MovieController.getAllMovies)
moviesRouter.post('/', MovieController.create)
//path-to-regex, valores que vienen informados en la url y el parametro se define en express

moviesRouter.get('/:id', MovieController.getById)
moviesRouter.patch('/:id', MovieController.update)
moviesRouter.delete('/:id', MovieController.delete)
