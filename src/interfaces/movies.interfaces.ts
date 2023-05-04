import { z } from 'zod';
import { createMovieSchema, movieSchema } from '../schemas';
import { DeepPartial, Repository } from 'typeorm';
import { Movie } from '../entities';

type TMovie = z.infer<typeof movieSchema>
type TCreateMovie = z.infer<typeof createMovieSchema>
type TUpdateMovie = DeepPartial<TCreateMovie>
type TMovieRepo = Repository<Movie>

export {
    TCreateMovie,
    TMovie,
    TUpdateMovie,
    TMovieRepo
}