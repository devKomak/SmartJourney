import { User } from './shared/user';
import { OnInit, Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { userCoords } from './shared/userCoords';
import { Dates } from './shared/dates';
import { Airport } from './shared/airport';
import { Subject } from 'rxjs/Subject';
import { Results } from './shared/Results';
import { ProviderCar } from './shared/provider-car';
import { Car } from './shared/car';
import { environment } from '../environments/environment.prod';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { jsonEval } from '@firebase/util';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService implements OnInit {

  private amadeusKey;
  public user: User;
  private userId: number;
  public isAirports: boolean;
  public subject1 = new Subject<Boolean>();
  public subject2 = new Subject<Boolean>();
  public isOutBoundFlightSubject = new Subject<Boolean>();
  public isInBoundFlightSubject = new Subject<Boolean>();
  public isCars = new Subject<Boolean>();
  public resultsFlights: Results[];
  public userJourneys;
  public journeysCollection: AngularFirestoreCollection<any>;
  public journeyDoc: AngularFirestoreDocument<any>;
  public journeys: Observable<any>;
  public journey: Observable<any>;
  public summaryJourneys;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private afs: AngularFirestore) {
    this.journeysCollection = this.afs.collection('journeys');
    this.user = new User();
    this.isAirports = false;
    this.amadeusKey = environment.amadeus_API_KEY;
    this.summaryJourneys = [];
  }

  ngOnInit() {
  }

  getUser() {
    return this.user;
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

  addInBoundFlight(flight) {
    this.user.setInBoundFlight(flight);
  }

  addOutBoundFlight(flight) {
    this.user.setOutBoundFlight(flight);
  }

  getChoosedAirport() {
    return this.user.choosedAirport;

  }


  getJourneys(): Observable<any[]> {
    this.summaryJourneys = [];
    this.journeys = this.journeysCollection.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data();
        // tslint:disable-next-line:triple-equals
        if (data.data.uid == this.authService.getUid()) {
                  this.summaryJourneys.push(data.data);
        }
      });
    });
    return this.journeys;
  }

  newJourney(user: any) {
    this.journeysCollection.add(user);
  }

  getCars() {
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://api.sandbox.amadeus.com/v1.2/cars/search-circle?pick_up=' + this.user.dates.startDate
    + '&drop_off=' + this.user.dates.endDate + '&latitude=' + this.user.userCoords.latEnd
    + '&longitude=' + this.user.userCoords.lngEnd + '&apikey=' + this.amadeusKey + '&currency=USD')
    .map((response: any) => {
      const data = response.results;
      for (const p of data) {

        const providerName = p.provider.company_name;
        const location = p.location;
        const address = {street: p.address.line1, city: p.address.city};
        const cars = p.cars;

        const carTemp = new Array<Car>();

        for (const c of p.cars) {
          const transmission = c.vehicle_info.transmission;
          const air_conditioning = c.vehicle_info.air_conditioning;
          const category = c.vehicle_info.category;
          const type = c.vehicle_info.type;
          const fuel = c.vehicle_info.fuel;
          const cost = c.estimated_total.amount;
          carTemp.push(new Car(transmission, fuel, air_conditioning, category, type, cost));
        }
        this.user.provider.push(new ProviderCar(providerName, location, address, carTemp));
      }
      this.isCars.next(true);
    },
    error => {
      console.log('error');
      this.router.navigate(['error']);
    }
  );
  }

  getAirports() {
    // tslint:disable-next-line:max-line-length
    return this.http.get('https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?apikey=' + this.amadeusKey + '&latitude='
    + this.user.userCoords.latStart + '&longitude=' + this.user.userCoords.lngStart)
    .subscribe(data => {
      this.user.setAirports(data);
      this.subject1.next(true);
    }
  );
  }

  getAirportEnd() {
    // tslint:disable-next-line:max-line-length
    const a = this.http.get('https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?apikey=' + this.amadeusKey + '&latitude='
    + this.user.userCoords.latEnd + '&longitude=' + this.user.userCoords.lngEnd)
    .subscribe((data: Airport[]) => {
      this.user.setEndAirport(data);
      this.subject2.next(true);
    },
    error => {
        this.router.navigate(['error']);
    });
  }

  showAirportEnd() {
    return this.user.endAirport;
  }

  getInBoundFlights() {

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

    const b = this.http.get('https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=' + this.amadeusKey + '&origin='
    + originName + '&destination=' + this.user.endAirport.airport + '&departure_date=' + this.user.dates.startDate
    +  '&number_of_results=35' + '&currency=USD')
    .subscribe((data: any)  => {
      this.resultsFlights = data.results;
      if (this.resultsFlights) { this.isInBoundFlightSubject.next(true); console.log(this.resultsFlights); }
    },
    error => {
        this.router.navigate(['error']);
    });

  }

  getOutBoundFlights() {

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

    const b = this.http.get('https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=' + this.amadeusKey + '&origin='
    +  this.user.endAirport.airport + '&destination=' + originName + '&departure_date=' + this.user.dates.endDate
    +  '&number_of_results=35' + '&currency=USD')
    .subscribe((data: any)  => {
      this.resultsFlights = data.results;
      if (this.resultsFlights) { this.isOutBoundFlightSubject.next(true); console.log(this.resultsFlights); }
    },
    error => {
        this.router.navigate(['error']);
    });

  }

  showAirports() {
    return this.user.airports;
  }

  getUserCoords() {
    return this.user.userCoords;
  }
  }
