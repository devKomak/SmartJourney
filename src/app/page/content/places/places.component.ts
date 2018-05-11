import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Place } from '../../../shared/place';
import { UserService } from '../../../users.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatCheckbox } from '@angular/material';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  places: Place[];
  show = 5;
  choosedPlaces: Place[];

  @ViewChildren('checkBox') cb;

  constructor(private userService: UserService, private router: Router, private location: Location) { }

  ngOnInit() {
    this.places = this.userService.places;
    this.choosedPlaces = [];
  }

  back(){
    this.location.back();
  }

  summary(){

  }

  choosePlace(p: Place, index: number){
    console.log(this.choosedPlaces);
    console.log(this.cb);

    if(this.cb._results[index].checked) { this.choosedPlaces.push(p)}
    else {
      for(let i = 0; i <this.choosedPlaces.length; i++){
        if(p.title === this.choosedPlaces[i].title) this.choosedPlaces.splice(i,1);
      }
    }

    console.log(this.choosedPlaces);

  }

  showValue() {
    this.show += 5;
  }
  showValueLess() {
    if (this.show >= 10)  {this.show -= 5; }
  }

}
