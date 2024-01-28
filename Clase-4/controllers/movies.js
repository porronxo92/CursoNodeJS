//CONTROLADOR - ORQUESTADOR.
//Actuara de intermediario entre la Vista y el modelo. Es el que se encarga de recoger los datos, validar que todos estan bien
// y comprobar que los datos que se van a pasar a la logica de negocio no sean malos, peligrosos...

import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schema/movies.js'

export class MovieController {
  static async getAllMovies(req, res) {
    try {
      const { genre } = req.query
      //con asyn-await necesitamos try-catch si o si
      const movies = await MovieModel.getAllMovies({ genre })
      return res.json(movies)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async getById(req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    return res.status(404).json({ message: 'Error 404: Movie not found' })
  }

  static async create(req, res) {
    const result = validateMovie(req.body)
    if (result.error) {
      return res.status(400).json({ message: result.error.message }) //Error 400: Bad Request, el cliente ha hecho mal para la peticion
    }

    const newMovie = await MovieModel.create({ input: result.data })
    return res.status(201).json(newMovie)
  }

  static async delete(req, res) {
    const { id } = req.params
    const result = validatePartialMovie(req.body)

    if (result.error) {
      return res.status(400).json({ message: result.error.message }) //Error 400: Bad Request, el cliente ha hecho mal para la peticion
    }
    const movieDelete = await MovieModel.delete({ id })
    if (!movieDelete) return res.status(404).json({ message: 'Error 404: Movie not found' })
    return res.json({ message: 'Movie deleted' })
  }

  static async update(req, res) {
    const { id } = req.params
    const result = validatePartialMovie(req.body)

    if (result.error) {
      return res.status(400).json({ message: result.error.message }) //Error 400: Bad Request, el cliente ha hecho mal para la peticion
    }
    const updateMovie = await MovieModel.update({ id, input: result.data })

    if (!updateMovie) return res.status(404).json({ message: 'Error 404: Movie not found' })

    return res.status(201).json(updateMovie)
  }
}
