import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../users.service';
import { Provider } from '@angular/compiler/src/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  providers: Provider[];
  public providerIndex: number[];
  public carIndex: number[];
  prices: Array<Number>;
  temp;
  isCar;
  show = 5;

  constructor(private userService: UserService) {

  }

  showValue() {
    this.show += 5;
  }

  ngOnInit() {
    this.providers = this.userService.user.provider;

    this.prices = new Array();
    this.temp = new Array();

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
    console.log(this.providers);
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
  }

}
