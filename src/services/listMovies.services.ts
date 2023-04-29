import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import { TMovieRepo } from '../interfaces';

const listMoviesService = async (params: any): Promise<any> => {
  const movieRepository: TMovieRepo = AppDataSource.getRepository(Movie);

  const totalCount = await movieRepository.count();

  if(params.perPage <= 0 || params.perPage > 5){
    params.perPage = 5
  }

  let perPage = parseInt(params.perPage) || 5;
  let page = parseInt(params.page) || 1;

  if (page < 1) {
    page = 1;
  }

  const skip = (page - 1) * perPage;

  const order = params.order ? params.order.toUpperCase() : null;
  let findOptions: any = {
    take: perPage,
    skip: skip,
    order: { id: 'ASC' },
  };
  if (params.sort === 'price') {
    findOptions.order = { price: order || 'ASC' };
  } else if (params.sort === 'duration') {
    findOptions.order = { duration: order || 'ASC' };
  }

  const findMovies = await movieRepository.find(findOptions);

  const movies = findMovies;

  const totalPages = Math.ceil(totalCount / perPage);

  const prevPage =
    page > 1
      ? `http://localhost:3000/movies?page=${page - 1}&perPage=${perPage}`
      : null;

  const nextPage =
    page < totalPages
      ? `http://localhost:3000/movies?page=${page + 1}&perPage=${perPage}`
      : null;

  return {
    prevPage,
    nextPage,
    count: totalCount,
    data: movies,
  };
};

export default listMoviesService;
