//LOGICA DE NEGOCIO
//VALIDACION QUE SE HACEN EN EL MODELO:
//Validaciones de datos para perpetuar la integridad de los datos. Por ejemplo, validaciones de los datos de la bbdd,

import { query } from 'express'
import pg from 'pg'

//validaciones de que un dato es INT y no STRING, o si un id ya existe.
const DATABASE_URL_LOCAL = 'postgres://user_root:ruben.2409@localhost:5432/movies_database'
const DATABASE_URL = process.env.DATABASE_URL || DATABASE_URL_LOCAL

const password = process.env.PGPASSWORD || 'ruben.2409'
const config = {
  user: 'user_root', // default process.env.PGUSER || process.env.USER
  password: password, //default process.env.PGPASSWORD
  host: 'localhost', // default process.env.PGHOST
  database: 'movies_database', // default process.env.PGDATABASE || user
  port: 5432, // default process.env.PGPORT
  connectionString: DATABASE_URL_LOCAL,
}
console.log(config)
const client = new pg.Client(config)
await client.connect()

//LO IMPORTANTE ENTRE MODELOS DEL MISMO RECURSO, ES QUE CUMPLA EL MISMO CONTRATO ESTABLECIDO DE METODOS Y CLASES
export class MovieModel {
  static async getAll() {
    const { rows } = await client.query('SELECT * from movies;')
    return rows
  }

  static async getAllMovies({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()
      const queryByGenre = `SELECT *
        FROM movies m
        WHERE EXISTS (
            SELECT *
            FROM movie_genre mg
            JOIN genre g ON mg.genre_id = g.id
            WHERE mg.movie_id = m.id
            AND LOWER(g.name) = '${lowerCaseGenre}');` //hacer asi la query nos exponemos a tener ataques de SQL Injection

      console.log(queryByGenre)
      const { rows } = await client.query(
        `SELECT * FROM movies m 
        WHERE EXISTS 
        (SELECT * FROM movie_genre mg 
            JOIN genre g 
            ON mg.genre_id = g.id 
            WHERE mg.movie_id = m.id 
            AND LOWER(g.name) = $1);`,
        [lowerCaseGenre]
      )
      return rows
    } else {
      return await this.getAll()
    }
  }

  static async getById({ id }) {
    const { rows } = await client.query('SELECT * FROM movies WHERE id = $1;', [id])
    const [movie] = rows
    return movie
  }

  static async create({ input }) {
    const { name, release_year, director, duration, poster, rate, genre } = input
    const resultUUID = await client.query('SELECT gen_random_uuid () as uuid;')
    const {
      rows: [{ uuid }],
    } = resultUUID
    console.log('uuid:', uuid)

    try {
      const result = await client.query(
        `
        INSERT INTO movies (id, title, year, director, duration, poster, rate) values ($1, $2, $3, $4, $5, $6, $7);`,
        [uuid, name, release_year, director, duration, poster, rate]
      )

      if (genre) {
        const lowerCaseGenre = genre[0].toLowerCase()
        console.log('Genero:', genre)
        const {
          rows: [{ id }],
        } = await client.query('SELECT id from genre WHERE name = $1', [lowerCaseGenre])
        console.log('idGenre', id)
        await client.query(
          `
               INSERT INTO movie_genre (movie_id, genre_id) values ($1, $2);`,
          [uuid, id]
        )
      }
      const { rows } = await client.query('SELECT * FROM movies WHERE id = $1', [uuid])
      console.log(rows)
      const [newMovie] = rows
      console.log(newMovie)
      return newMovie
    } catch (error) {
      console.error(error)
    }
  }

  static async delete({ id }) {}

  static async update({ id, input }) {}
}
