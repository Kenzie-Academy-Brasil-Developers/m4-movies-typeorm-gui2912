import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import {
  TMovie,
  TUpdateMovie,
} from '../interfaces/movies.interfaces';
import { movieSchema, updateMovieSchema } from '../schemas/movies.schemas';
import { TMovieRepo } from "../interfaces"

const updateMovieService = async (
  newMovieData: TUpdateMovie,
  movieId: number
): Promise<TMovie> => {
  const movieRepository: TMovieRepo = AppDataSource.getRepository(Movie);

  const oldMovieData = await movieRepository.findOneBy({ id: movieId });

  const movie = movieRepository.create({
    ...oldMovieData,
    ...newMovieData
  })

  updateMovieSchema.parse(movie)

  await movieRepository.save(movie)

  const updatedMovie = movieSchema.parse(movie)

  return updatedMovie
};

export default updateMovieService

