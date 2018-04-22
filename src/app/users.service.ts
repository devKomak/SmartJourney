import { User } from './shared/user';
import { OnInit, Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { userCoords } from './shared/userCoords';
import { Dates } from './shared/dates';
import { Airport } from './shared/airport';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService implements OnInit {

  private user: User;
  private userId: number;
  public isAirports: boolean;
  public subject1 = new Subject<Boolean>();
  public subject2 = new Subject<Boolean>();

  constructor(private http: HttpClient) {
    this.user = new User();
    this.isAirports = false;
  }

  ngOnInit() {
  }

  addUserCoords(userCoords: userCoords) {
    this.user.setUserCoords(userCoords);
  }

  addPeople(people: number) {
    this.user.setPeople(people);
  }
  addUserDates( dates: Dates) {
    this.user.setDates(dates);
  }

  addAirport(airport){
    this.user.setChoosedAirport(airport);
  }

  getChoosedAirport(){
    return this.user.choosedAirport;
  }

  getAirports() {
    let a = this.http.get("https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?apikey=8JpvcLVCBj4Ftpkr9ajanPm3QdqpGogT&latitude="+this.user.userCoords.latStart+"&longitude="+this.user.userCoords.lngStart)
    .subscribe(data =>{
      this.user.setAirports(data);
      this.subject1.next(true);
    });
  }

  getAirportEnd() {
    let a = this.http.get("https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?apikey=8JpvcLVCBj4Ftpkr9ajanPm3QdqpGogT&latitude="+this.user.userCoords.latEnd+"&longitude="+this.user.userCoords.lngEnd)
    .subscribe((data: Airport[]) =>{
      this.user.setEndAirport(data);
      this.subject2.next(true);
    });
  }
  
  showAirportEnd(){
    return this.user.endAirport;
  }

  getFlights(){

    let originName;
    for(let i = 0; i < this.user.airports.length; i++){
        if(this.user.airports[i].airport_name === this.user.choosedAirport.airportName) originName = this.user.airports[i].airport;
    }

    console.log(originName + " " + this.user.endAirport.airport);

    let a = this.http.get("https://api.sandbox.amadeus.com/v1.2/flights/affiliate-search?apikey=8JpvcLVCBj4Ftpkr9ajanPm3QdqpGogT&origin="+ originName +"&destination="+this.user.endAirport.airport+"&departure_date="+this.user.dates.startDate+"&return_date="+this.user.dates.endDate)
    .subscribe(data  =>{
      console.log(data);
    });

    let b = this.http.get("https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=8JpvcLVCBj4Ftpkr9ajanPm3QdqpGogT&origin="+ originName +"&destination="+this.user.endAirport.airport+"&departure_date="+this.user.dates.startDate+"&return_date="+this.user.dates.endDate)
    .subscribe(data  =>{
      console.log(data);
    });

  }


  showAirports(){
    return this.user.airports;
  }

  getUserCoords(){
    return this.user.userCoords;
  }

  }





