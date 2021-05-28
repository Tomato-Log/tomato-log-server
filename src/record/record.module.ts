import { forwardRef, Module } from '@nestjs/common';
import { MovieModule } from 'src/movie/movie.module';
import { UserModule } from 'src/user/user.module';
import { RecordResolver } from './resolvers/record.resolver';
import { RecordService } from './services/record.service';

@Module({
  imports: [forwardRef(() => UserModule), MovieModule],
  providers: [RecordResolver, RecordService],
})
export class RecordModule {}
