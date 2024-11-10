import { Resolver, Query, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { RestaurantService } from './restaurants.service';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args('restaurantData') createRestaurantInput: CreateRestaurantInput,
  ): Promise<Restaurant> {
    return this.restaurantService.createRestaurant(createRestaurantInput);
  }

  @Mutation(() => Restaurant)
  async updateRestaurant(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateRestaurantData') updateRestaurantInput: UpdateRestaurantInput,
  ): Promise<Restaurant> {
    return this.restaurantService.updateRestaurant(id, updateRestaurantInput);
  }

  @Mutation(() => Boolean)
  async deleteRestaurant(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.restaurantService.deleteRestaurant(id);
  }

  @Query(() => [Restaurant], { name: 'restaurants' })
  async getRestaurants(
    @Args('isOpen', { type: () => Boolean, nullable: true }) isOpen?: boolean,
    @Args('minRating', { type: () => Float, nullable: true })
    minRating?: number,
    @Args('maxDistance', { type: () => Float, nullable: true })
    maxDistance?: number,
    @Args('userLatitude', { type: () => Float, nullable: true })
    userLatitude?: number,
    @Args('userLongitude', { type: () => Float, nullable: true })
    userLongitude?: number,
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 })
    page: number = 1,
    @Args('pageSize', { type: () => Int, nullable: true, defaultValue: 10 })
    pageSize: number = 10,
  ): Promise<Restaurant[]> {
    return this.restaurantService.getRestaurants({
      isOpen,
      minRating,
      maxDistance,
      userLatitude,
      userLongitude,
      search,
      page,
      pageSize,
    });
  }
}
