import { ServiceInput } from './create-restaurant.input';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateRestaurantInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  rating?: number;

  @Field({ nullable: true })
  isOpen?: boolean;

  @Field(() => [ServiceInput], { nullable: true })
  services?: ServiceInput[];

  @Field(() => [String], { nullable: true })
  images?: string[];

  @Field({ nullable: true })
  latitude?: number;

  @Field({ nullable: true })
  longitude?: number;
}
