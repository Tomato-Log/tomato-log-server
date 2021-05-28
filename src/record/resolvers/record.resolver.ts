import { Args, ID, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Record } from '../entities/record.entity';
import { RecordDataInput } from '../inputs/record-data.input';
import { RecordService } from '../services/record.service';

@Resolver(() => Record)
export class RecordResolver {
  constructor(private readonly recordService: RecordService) {}

  @Query(() => [Record], { name: 'getRecordsFromUserId' })
  public async getRecords(
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<Record[]> {
    return this.recordService.getRecords(Number(userId));
  }

  @Mutation(() => Record, { name: 'saveRecord' })
  public async saveRecord(
    @Args('data') data: RecordDataInput,
  ): Promise<Record> {
    return this.recordService.saveRecord(data);
  }
}
