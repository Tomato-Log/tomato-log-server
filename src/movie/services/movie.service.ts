import { Injectable } from '@nestjs/common';
import { Movie } from '../entities/Movie.entity';
import axios from 'axios';
import {
  MovieDto,
  MoviePopularResponseDto,
  MovieResponseDto,
} from '../dto/movie.response.dto';

const baseURL = 'https://api.themoviedb.org/3/movie';
// TODO : core/error 로 옮기기
const movieAlreadyExistError = '이미 존재하는 영화 id 입니다';

@Injectable()
export class MovieService {
  public async getMovies(): Promise<Movie[]> {
    return Movie.find();
  }

  public async saveFromId(id: number): Promise<Movie> {
    try {
      // 이미 존재하는 영화인지 확인
      const isExist = await Movie.findOne({
        where: {
          id,
        },
      });

      if (isExist) {
        throw new Error(movieAlreadyExistError);
      }

      const url = `${baseURL}/${id}`;

      const res: MovieResponseDto = await axios.get(url, {
        params: {
          api_key: process.env.movie_api_key,
          language: 'ko',
        },
      });
      const movie: Movie = await this.getMovieFromMovieDto(res.data);
      return movie.save();
    } catch (err) {
      console.error(err);
    }
  }

  public async getPopularMovies(): Promise<Movie[]> {
    try {
      const url = `${baseURL}/popular`;
      const res: MoviePopularResponseDto = await axios.get(url, {
        params: {
          api_key: process.env.movie_api_key,
          language: 'ko',
        },
      });

      const movies: Movie[] = [];
      for (const item of res.data.results) {
        movies.push(await this.getMovieFromMovieDto(item));
      }

      return movies;
    } catch (err) {
      console.error(err);
    }
  }
  public async getMovieFromMovieDto(dto: MovieDto) {
    const movie: Movie = Movie.create({
      id: dto.id,
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
  }
}
