import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Movie } from "../entities"
import { TMovieRepo } from "../interfaces"

const deleteMovieService = async(movieId:number): Promise<void> => {
  const userRepository: TMovieRepo = AppDataSource.getRepository(Movie)

  const movie = await userRepository.findOne({
    where: {
      id: +movieId
    }
  })
  
  await userRepository.remove(movie!)
}

export default deleteMovieService
