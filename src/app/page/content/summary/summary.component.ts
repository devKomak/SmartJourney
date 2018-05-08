import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../users.service';
import { User } from 'firebase/app';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  isLinear = false;

  user;
  public geocoder;
  public nameStart;
  public nameEnd;
  public LatLng1;
  public LatLng2;


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private userService: UserService, private _formBuilder: FormBuilder) {
    this.user = this.userService.getUser();
    console.log(this.user);
  }

  ngOnInit() {
    this.geocoder =  new google.maps.Geocoder;

    this.LatLng1 = {lat: this.userService.user.userCoords.latStart, lng: this.userService.user.userCoords.lngStart};
          // Change name coords addres to name place
          this.geocoder.geocode({'location': this.LatLng1}, (results, status) => {
            if (status === 'OK') {
              this.nameStart = results[0].formatted_address;
            }
          });

   this.LatLng2 = {lat: this.userService.user.userCoords.latEnd, lng: this.userService.user.userCoords.lngEnd};
      // Change name coords addres to name place
      this.geocoder.geocode({'location': this.LatLng2}, (results, status) => {
        if (status === 'OK') {
          this.nameEnd = results[0].formatted_address;
        }
      });

      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });

  }

}
