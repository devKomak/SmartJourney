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
  public subject = new Subject<Boolean>();

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

  getAirports() {
    let a = this.http.get("https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?apikey=8JpvcLVCBj4Ftpkr9ajanPm3QdqpGogT&latitude="+this.user.userCoords.latStart+"&longitude="+this.user.userCoords.lngStart)
    .subscribe(data => {
      this.user.setAirports(data);
      this.subject.next(true);
    });
  }


  showAirports() {
    console.log(this.user.airports);
    return this.user.airports;
  }

  getUserCoords() {
    return this.user.userCoords;
  }

  }





