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
