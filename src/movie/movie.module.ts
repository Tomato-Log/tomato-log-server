import { Module } from '@nestjs/common';
import { MovieResolver } from './resolvers/movie.resolver';
import { MovieService } from './services/movie.service';

@Module({
  providers: [MovieService, MovieResolver],
  exports: [MovieService],
})
export class MovieModule {}
