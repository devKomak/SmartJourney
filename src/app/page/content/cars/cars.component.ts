import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../users.service';
import { Provider } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  providers: Provider[];
  public providerIndex: number[];
  public carIndex: number[];
  public choosedCar;
  public started: boolean;
  public index;
  prices: Array<Number>;
  temp;
  isCar;
  show = 5;


  constructor(private userService: UserService, private router: Router) {

  }

  showValue() {
    this.show += 5;
  }

  showValueLess() {
    if (this.show >= 10)  {this.show -= 5; }
  }

  takeCar(car: any, index: number) {
    this.choosedCar = car;
    console.log(this.choosedCar);
    this.userService.user.choosedCar = this.choosedCar;
    this.index = index;
    this.started = true;
    this.userService.getHotels().subscribe(response => {
      console.log(response);
    });
    this.userService.isHotels.subscribe(message => {
      if (message === true) {  this.router.navigate(['hotels']); }
    })
  }

  ngOnInit() {
    this.providers = this.userService.user.provider;

    this.prices = new Array();
    this.temp = new Array();
    this.started = false;

    for (let i = 0; i < this.providers.length; i++) {
      for (let j = 0; j < this.providers[i].cars.length; j++) {
        this.prices.push(this.providers[i].cars[j].cost);
      }
    }

    this.prices.sort((a: number, b: number) => {
      return a - b;
    });
    const unique = this.prices.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
  });

    this.prices = unique;
    let d = 0;
    for (let k = 0; k < this.prices.length; k++) {
      for (let i = 0; i < this.providers.length; i++) {
        for (let j = 0; j < this.providers[i].cars.length; j++) {
          const a = this.providers[i].cars[j].cost;
          const b =  this.providers[i];
          const c = this.providers[i].cars[j];
            if (this.prices[k] === a && a !== 0) {
              this.temp[d] = new Array();
              this.temp[d].push(a, b, c);
              d++;
            }
        }
        }
      }

      console.log(this.temp);

  }

}
