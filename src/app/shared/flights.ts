export class Flights {
  constructor(public departs_at: String, public arrives_at: String, public origin: {airport},
              public destination: {airport}, public operating_airline: String, public flight_number: String) {

  }
}
