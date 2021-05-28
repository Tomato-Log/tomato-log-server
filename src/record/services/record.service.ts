import { Injectable } from '@nestjs/common';
import { UserInputError } from 'apollo-server-errors';
import { ERROR_MESSAGE } from 'src/core/error';
import { Movie } from 'src/movie/entities/Movie.entity';
import { MovieService } from 'src/movie/services/movie.service';
import { User } from 'src/user/entities/User.entity';
import { Record } from '../entities/record.entity';
import { RecordDataInput } from '../inputs/record-data.input';

@Injectable()
export class RecordService {
  constructor(private movieService: MovieService) {}

  public async getRecords(userId: number): Promise<Record[]> {
    return Record.find({
      where: {
        userId,
      },
    });
  }

  public async saveRecord(data: RecordDataInput): Promise<Record> {
    const user = await User.findOne(data.userId);
    if (!user) {
      throw new UserInputError(ERROR_MESSAGE.userNotExist);
    }
    const movie = await this.getMovie(Number(data.mvdbId));
    if (!movie) {
      throw new UserInputError(ERROR_MESSAGE.movieNotExit);
    }
    await this.isRecordExist(movie, user);
    delete data.userId;
    delete data.mvdbId;
    const record = Record.create({
      ...data,
      user,
      movie,
    });
    return record.save();
  }

  private async getMovie(mvdbId: number): Promise<Movie> {
    const movie = await Movie.findOne({
      where: {
        mvdbId,
      },
    });
    if (!movie) {
      return this.movieService.saveFromMvdbId(mvdbId);
    }
    return movie;
  }

  // user가 해당 movie에 대해 이미 기록했는지
  private async isRecordExist(movie: Movie, user: User): Promise<void> {
    const hasRecord = await Record.findOne({
      where: {
        user,
        movie,
      },
    });
    if (hasRecord) {
      throw new UserInputError(ERROR_MESSAGE.recordAlreadyExist);
    }
  }
}
