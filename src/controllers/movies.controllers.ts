import { Request, Response } from "express";
import { TUpdateMovie } from "../interfaces";
import { createMovieService, deleteMovieService, listMoviesService, updateMovieService } from '../services';
import { returnAllMoviesSchema } from '../schemas';

const createMovieController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const movieData = req.body;
    const movieCreated = await createMovieService(movieData)
    return res.status(201).json(movieCreated);
};

const listMoviesController = async (
    req: Request,
    res: Response
) => {
    const params = req.query;

    const movieListed = await listMoviesService(params)

    return res.status(200).json(movieListed);
};

const deleteMovieController = async (req: Request, res: Response) => {
    await deleteMovieService(+req.params.id);

    return res.status(204).json();
};

const updateMovieController = async (req: Request, res: Response) => {
    const movieData: TUpdateMovie = req.body;
    const movieId: number = +req.params.id;

    const updatedMovie = await updateMovieService(movieData, movieId);

    return res.status(200).json(updatedMovie);
};

export {
    createMovieController,
    listMoviesController,
    updateMovieController,
    deleteMovieController
}
