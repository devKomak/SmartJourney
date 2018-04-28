import { Car } from './car';

export class ProviderCar {

  constructor(public providerName: String, public location: {latitude: number, longitiude: number},
              public address: {street: String, city: String},  public cars: Car[]) {}

}
