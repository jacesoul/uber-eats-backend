import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Restaurant } from './entities/restaurant.entity';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  @Query((returns) => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Restaurant[] {
    console.log(veganOnly);
    return [];
  }

  @Mutation((returns) => Boolean)
  createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantDto,
  ): boolean {
    console.log(createRestaurantInput);
    return true;
  }
}
