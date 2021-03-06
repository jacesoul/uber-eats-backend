import { TypeOrmModule } from '@nestjs/typeorm';
import {
  RestaurantResolver,
  CategoryResolver,
  DishResolver,
} from './restaurants.resolver';
import { Module } from '@nestjs/common';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';
import { CategoryRepository } from './repositories/category.repository';
import { Dish } from './entities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, CategoryRepository, Dish])],
  providers: [
    RestaurantService,
    RestaurantResolver,
    CategoryResolver,
    DishResolver,
  ],
})
export class RestaurantsModule {}
