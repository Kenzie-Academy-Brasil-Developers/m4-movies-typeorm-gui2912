import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Movie } from '../entities';
import { AppError } from '../errors';
import { TCreateMovie, TMovieRepo } from '../interfaces';

const ensureMovieNameIsUniqueMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: TMovieRepo = AppDataSource.getRepository(Movie);

  const request: TCreateMovie = req.body;

  if (request.name) {
    const findMovie = await userRepository.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (findMovie?.name) {
      throw new AppError('Movie already exists.', 409);
    }
  }

  return next();
};

export default ensureMovieNameIsUniqueMiddleware;