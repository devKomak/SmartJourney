import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../users.service';
import { Hotel } from '../../../shared/hotel';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  hotels: Hotel[];
  show = 5;
  constructor(private userService: UserService) {
    this.hotels = this.userService.hotels;
  }

  ngOnInit() {
    this.userService.getHotels().subscribe(response => {
      console.log(response);
    });
  }

  showValue() {
    this.show += 5;
  }

  showValueLess() {
    if (this.show >= 10)  {this.show -= 5; }
  }
}
