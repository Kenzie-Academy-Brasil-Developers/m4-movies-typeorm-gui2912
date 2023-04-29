import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { TCreateMovie, TMovie, TMovieRepo } from "../interfaces";
import { movieSchema } from "../schemas";

const createMovieService = async (data: TCreateMovie): Promise<TMovie> => {
    const movieRepository: TMovieRepo = AppDataSource.getRepository(Movie);

    const movie = movieRepository.create(data);

    await movieRepository.save(movie);

    const newMovie = movieSchema.parse(movie);

    return newMovie;
};

export default createMovieService;
