import { CoreOutput } from 'src/common/dtos/output.dto';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Restaurant } from '../entities/restaurant.entity';

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
  'name',
  'coverImg',
  'address',
]) {
  @Field((type) => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {
  @Field((type) => Number)
  restaurantId?: number;
}
