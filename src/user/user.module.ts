import { forwardRef, Module } from '@nestjs/common';
import { RecordModule } from 'src/record/record.module';
import { UserResolver } from './resolvers/user.resolver';
import { UserService } from './services/user.service';

@Module({
  imports: [forwardRef(() => RecordModule)],
  providers: [UserResolver, UserService],
})
export class UserModule {}
