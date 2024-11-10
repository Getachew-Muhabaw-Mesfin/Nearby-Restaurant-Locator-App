import { InputType, Field, Float } from '@nestjs/graphql';

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

  @Field()
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

  @Field({ nullable: true })
  month?: number;

  @Field({ nullable: true })
  year?: number;

  @Field()
  start: string;
  @Field()
  end: string;
}
