import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Movie } from '../entities/Movie.entity';
import { MovieService } from '../services/movie.service';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query(() => [Movie], { name: 'movies' })
  public async getMovies(): Promise<Movie[]> {
    return this.movieService.getMovies();
  }

  @Query(() => [Movie])
  public async getPupulars(): Promise<Movie[]> {
    return await this.movieService.getPopularMovies();
  }

  @Mutation(() => Movie)
  public async saveMovies(@Args('id', { type: () => Int }) id: number) {
    return await this.movieService.saveFromId(id);
  }
}
