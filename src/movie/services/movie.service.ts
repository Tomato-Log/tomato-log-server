import { Injectable } from '@nestjs/common';
import { Movie } from '../entities/Movie.entity';
import { MOVIE_BASE_URL } from '../../core/constants';
import { ERROR_MESSAGE } from '../../core/error';
import { UserInputError } from 'apollo-server-express';
import axios from 'axios';
import { MovieDto, MoviePopularDto } from '../dto/movie.response.dto';

@Injectable()
export class MovieService {
  public async getMovies(): Promise<Movie[]> {
    return Movie.find();
  }

  public async saveFromMvdbId(mvdbId: number): Promise<Movie> {
    try {
      // 이미 존재하는 영화인지 확인
      const isExist = await Movie.findOne({
        where: {
          mvdbId: mvdbId,
        },
      });

      if (isExist) {
        throw new UserInputError(ERROR_MESSAGE.movieAlreadyExistError);
      }

      const res = await this.getMovieDto(`/${mvdbId}`);
      const movie: Movie = await this.getMovieFromMovieDto(res as MovieDto);
      return movie.save();
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  public async getPopularMovies(): Promise<Movie[]> {
    try {
      const res = await this.getMovieDto('/popular');

      const movies: Movie[] = [];
      for (const item of (res as MoviePopularDto).results) {
        movies.push(await this.getMovieFromMovieDto(item));
      }

      return movies;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
  public async getMovieFromMovieDto(dto: MovieDto) {
    try {
      const movie: Movie = Movie.create({
        mvdbId: dto.id,
        title: dto.title,
        releaseDate: dto.release_date,
      });
      if (dto.genres) {
        movie.genre = dto.genres[0].name;
      }
      if (dto.poster_path) {
        movie.posterPath = dto.poster_path;
      }
      if (dto.production_countries) {
        movie.country = dto.production_countries[0].iso_3166_1;
      }
      if (dto.runtime) {
        movie.runtime = dto.runtime;
      }
      if (dto.overview) {
        movie.overview = dto.overview;
      }
      return movie;
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  private async getMovieDto(uri: string): Promise<MovieDto | MoviePopularDto> {
    const url = MOVIE_BASE_URL + uri;
    const { data } = await axios.get<MovieDto | MoviePopularDto>(url, {
      params: {
        api_key: process.env.movie_api_key,
        language: 'ko',
      },
    });
    return data;
  }
}
