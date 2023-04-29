import { z } from 'zod';

const movieSchema = z.object({
    id: z.number(),
    name: z.string().max(50),
    description: z.string().optional().nullable(),
    price: z.number().int(),
    duration: z.number().min(1, 'Number must be greater than 0')
})

const createMovieSchema = movieSchema.omit({id: true})

const updateMovieSchema = movieSchema.partial()

const returnAllMoviesSchema = movieSchema.array();

export {
    movieSchema,
    createMovieSchema,
    updateMovieSchema,
    returnAllMoviesSchema
}