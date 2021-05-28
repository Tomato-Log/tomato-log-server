import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from 'src/record/entities/record.entity';
import { RecordModule } from 'src/record/record.module';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Record]), forwardRef(() => RecordModule)],
  providers: [UserResolver, UserService],
})
export class UserModule {}
