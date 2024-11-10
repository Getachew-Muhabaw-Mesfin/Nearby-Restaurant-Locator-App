import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantResolver } from './restaurants.resolver';
import { RestaurantService } from './restaurants.service';

describe('RestaurantsResolver', () => {
  let resolver: RestaurantResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantResolver, RestaurantService],
    }).compile();

    resolver = module.get<RestaurantResolver>(RestaurantResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
