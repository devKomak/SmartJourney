import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../users.service';
import { Hotel } from '../../../shared/hotel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  hotels: Hotel[];
  show = 5;
  public started: boolean;
  public index: number;
  constructor(private userService: UserService, private router: Router) {
    this.hotels = this.userService.hotels;
  }

  ngOnInit() {
    this.started = false;
  }

}
check(hotel: Hotel, index: number){
  this.started = true;
    this.index = index;
    this.userService.addHotel(hotel);
    this.userService.getPlaces().subscribe(message =>{}, 
      error => { console.log(error)});
    this.userService.isPlaces.subscribe(message =>{
      if (message === true) {  this.router.navigate(['places']); }
}

showValue() {
  this.show += 5;
}
showValueLess() {
  if (this.show >= 10)  {this.show -= 5; }
}
}
