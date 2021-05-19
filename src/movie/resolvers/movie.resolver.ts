import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Movie } from '../entities/Movie.entity';
import { MovieService } from '../services/movie.service';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  /** 영화 목록이 잘 작동하는지 서버측에서 확인하기 위한 mutation */
  @Query(() => [Movie], { name: 'movies' })
  public async getMovies(): Promise<Movie[]> {
    return this.movieService.getMovies();
  }

  @Query(() => [Movie], { name: 'getPopulars' })
  public async getPupulars(): Promise<Movie[]> {
    return await this.movieService.getPopularMovies();
  }

  /** 영화 저장이 잘 작동하는지 서버측에서 확인하기 위한 mutation */
  @Mutation(() => Movie, { name: 'saveMovie' })
  public async saveMovie(@Args('id', { type: () => ID }) id: string) {
    return await this.movieService.saveFromId(Number(id));
  }
}
