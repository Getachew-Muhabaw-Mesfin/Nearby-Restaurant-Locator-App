import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurants.service';
import { RestaurantResolver } from './restaurants.resolver';

@Module({
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantsModule {}
