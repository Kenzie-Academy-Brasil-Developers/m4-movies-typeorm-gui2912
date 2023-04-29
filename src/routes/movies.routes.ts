import { Router } from "express";
import {
    ensureDataIsValidMiddleware,
    ensureMovieExistsMiddleware,
    ensureMovieNameIsUniqueMiddleware,
} from "../middlewares";
import { createMovieSchema } from "../schemas";
import {
    createMovieController,
    deleteMovieController,
    listMoviesController,
    updateMovieController,
} from "../controllers";

const movieRoutes: Router = Router();

movieRoutes.post(
    "",
    ensureDataIsValidMiddleware(createMovieSchema),
    ensureMovieNameIsUniqueMiddleware,
    createMovieController
);
movieRoutes.get("", listMoviesController);
movieRoutes.patch(
    "/:id",
    ensureMovieExistsMiddleware,
    ensureMovieNameIsUniqueMiddleware,
    updateMovieController
);
movieRoutes.delete("/:id", ensureMovieExistsMiddleware, deleteMovieController);

export default movieRoutes;
