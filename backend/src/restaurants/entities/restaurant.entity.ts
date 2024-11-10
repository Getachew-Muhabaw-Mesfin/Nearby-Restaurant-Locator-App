import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => Float)
  @Column('float')
  latitude: number;

  @Field(() => Float)
  @Column('float')
  longitude: number;

  @Field()
  @Column()
  address: string;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  isOpen: boolean;

  @Field(() => Float, { defaultValue: 0 })
  @Column('float', { default: 0 })
  rating: number;

  @Field(() => [String])
  @Column('text', { array: true })
  images: string[];

  @Field(() => [Service])
  @Column('jsonb')
  services: Service[];

  @Field(() => [OpeningHours])
  @Column('jsonb')
  openingHours: OpeningHours[];
}

@ObjectType()
export class Service {
  @Field()
  name: string;

  @Field(() => Float)
  price: number;
}

@ObjectType()
export class OpeningHours {
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
