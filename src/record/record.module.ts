import { Module } from '@nestjs/common';
import { MovieModule } from 'src/movie/movie.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, MovieModule],
})
export class RecordModule {}
