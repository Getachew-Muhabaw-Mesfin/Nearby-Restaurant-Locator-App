import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput {
  @Field()
  name: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  address: string;

  @Field(() => [OpeningHoursInput])
  openingHours: OpeningHoursInput[];

  @Field(() => Boolean, { defaultValue: false })
  isOpen: boolean;

  @Field(() => Float, { defaultValue: 0 })
  rating: number;

  @Field(() => [String])
  images: string[];

  @Field(() => [ServiceInput])
  services: ServiceInput[];
}

@InputType()
export class ServiceInput {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;
}

@InputType()
export class OpeningHoursInput {
  @Field()
  dayOfWeek: string;

  @Field(() => Int, { nullable: true })
  month?: number;

  @Field(() => Int, { nullable: true })
  year?: number;

  @Field()
  start: string;
  @Field()
  end: string;
}
