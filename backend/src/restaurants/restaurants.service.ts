import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';

interface GetRestaurantsFilter {
  isOpen?: boolean;
  minRating?: number;
  maxDistance?: number;
  userLatitude?: number;
  userLongitude?: number;
  search?: string;
  page?: number;
  pageSize?: number;
}

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async createRestaurant(
    createRestaurantInput: CreateRestaurantInput,
  ): Promise<Restaurant> {
    const restaurant = this.restaurantRepository.create(createRestaurantInput);
    return this.restaurantRepository.save(restaurant);
  }

  async updateRestaurant(
    id: number,
    updateRestaurantInput: UpdateRestaurantInput,
  ): Promise<Restaurant> {
    await this.restaurantRepository.update(id, updateRestaurantInput);
    return this.restaurantRepository.findOneOrFail({ where: { id } });
  }

  async deleteRestaurant(id: number): Promise<boolean> {
    const result = await this.restaurantRepository.delete(id);
    return result.affected > 0;
  }

  async getRestaurants({
    isOpen,
    minRating,
    maxDistance,
    userLatitude,
    userLongitude,
    search,
    page = 1,
    pageSize = 10,
  }: GetRestaurantsFilter): Promise<Restaurant[]> {
    let query = this.restaurantRepository.createQueryBuilder('restaurant');

    if (isOpen !== undefined) {
      query = query.andWhere('restaurant.isOpen = :isOpen', { isOpen });
    }

    if (minRating) {
      query = query.andWhere('restaurant.rating >= :minRating', { minRating });
    }

    if (search) {
      query = query.andWhere(
        'restaurant.name ILIKE :search OR restaurant.address ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (maxDistance && userLatitude && userLongitude) {
      const radius = 6371;
      query = query
        .addSelect(
          `(${radius} * acos(cos(radians(:userLatitude)) * cos(radians(restaurant.latitude)) * cos(radians(restaurant.longitude) - radians(:userLongitude)) + sin(radians(:userLatitude)) * sin(radians(restaurant.latitude))))`,
          'distance',
        )
        .having('distance <= :maxDistance', { maxDistance })
        .orderBy('distance', 'ASC')
        .setParameters({ userLatitude, userLongitude });
    }

    query = query.skip((page - 1) * pageSize).take(pageSize);
    return query.getMany();
  }
}
