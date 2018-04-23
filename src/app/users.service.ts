import { User } from './shared/user';
import { OnInit, Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { userCoords } from './shared/userCoords';
import { Dates } from './shared/dates';
import { Airport } from './shared/airport';
import { Subject } from 'rxjs/Subject';
import { Results } from './shared/Results';

@Injectable()
export class UserService implements OnInit {

  private user: User;
  private userId: number;
  public isAirports: boolean;
  public subject1 = new Subject<Boolean>();
  public subject2 = new Subject<Boolean>();
  public isFlightsSubject = new Subject<Boolean>();
  public isInBoundFlightSubject = new Subject<Boolean>();
  public resultsFlights: Results[];

  constructor(private http: HttpClient) {
    this.user = new User();
    this.isAirports = false;
  }

  ngOnInit() {
  }

  addUserCoords(coords: userCoords) {
    this.user.setUserCoords(coords);
  }

  addPeople(people: number) {
    this.user.setPeople(people);
  }
  addUserDates( dates: Dates) {
    this.user.setDates(dates);
  }

  addAirport(airport) {
    this.user.setChoosedAirport(airport);
  }

  addInboundFlight(flight) {
    this.user.setInboundFlight(flight);
    if (flight) {  console.log('true'); this.isInBoundFlightSubject.next(true); }
  }

  getChoosedAirport() {
    return this.user.choosedAirport;
  }

  getAirports() {
    // tslint:disable-next-line:max-line-length
    const a = this.http.get('https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?apikey=8JpvcLVCBj4Ftpkr9ajanPm3QdqpGogT&latitude='
    + this.user.userCoords.latStart + '&longitude=' + this.user.userCoords.lngStart)
    .subscribe(data => {
      this.user.setAirports(data);
      this.subject1.next(true);
    });
  }

  getAirportEnd() {
    // tslint:disable-next-line:max-line-length
    const a = this.http.get('https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?apikey=8JpvcLVCBj4Ftpkr9ajanPm3QdqpGogT&latitude='
    + this.user.userCoords.latEnd + '&longitude=' + this.user.userCoords.lngEnd)
    .subscribe((data: Airport[]) => {
      this.user.setEndAirport(data);
      this.subject2.next(true);
    });
  }

  showAirportEnd() {
    return this.user.endAirport;
  }

  getFlights() {

    let originName;
    for (let i = 0; i < this.user.airports.length; i++) {
        if (this.user.airports[i].airport_name === this.user.choosedAirport.airportName) { originName = this.user.airports[i].airport; }
    }

    // tslint:disable-next-line:max-line-length
    // const a = this.http.get('https://api.sandbox.amadeus.com/v1.2/flights/extensive-search?apikey=8JpvcLVCBj4Ftpkr9ajanPm3QdqpGogT&origin='
    // + originName + '&destination=' + this.user.endAirport.airport + '&departure_date=' + this.user.dates.startDate
    // + '&return_date=' + this.user.dates.endDate)
    // .subscribe(data  => {
    // });

    const b = this.http.get('https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=8JpvcLVCBj4Ftpkr9ajanPm3QdqpGogT&origin='
    + originName + '&destination=' + this.user.endAirport.airport + '&departure_date=' + this.user.dates.startDate
    + '&return_date=' + this.user.dates.endDate + '&number_of_results=15')
    .subscribe((data: any)  => {
      this.resultsFlights = data.results;
      if (this.resultsFlights) { this.isFlightsSubject.next(true); }
    });

  }


  showAirports() {
    return this.user.airports;
  }

  getUserCoords() {
    return this.user.userCoords;
  }
  }
