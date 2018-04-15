import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  onBack() {
    this.location.back();

  }

}
