import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field((type) => Number, { defaultValue: 1 })
  page: number;
}

@ObjectType()
export class PaginationOutput extends CoreOutput {
  @Field((type) => Number, { nullable: true })
  totalPages?: number;

  @Field((type) => Number, { nullable: true })
  totalResults?: number;
}
