import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../users.service';
import { User } from 'firebase/app';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

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
  state;
  saved: boolean;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private afs: AngularFirestore, private userService: UserService, private _formBuilder: FormBuilder,
    private af: AngularFireAuth, private router: Router) {
    this.user = this.userService.getUser();
    this.saved = false;
  }

  saveJourney() {
    this.userService.user.uid = this.af.auth.currentUser.uid;
    this.user = this.userService.getUser();
    const data = JSON.parse(JSON.stringify(this.user));
    this.userService.newJourney({data});
    this.saved = true;
    setTimeout(() => {this.router.navigate(['']); }, 4000);
  }

  ngOnInit() {

    this.state = false;
    this.af.authState.subscribe(auth => {
      if (auth) {
        this.userService.user.uid = this.af.auth.currentUser.uid;
        this.state = true;
      } else {
        this.state = false;
      }
    });

    this.geocoder =  new google.maps.Geocoder;

    this.LatLng1 = {lat: this.userService.user.userCoords.latStart, lng: this.userService.user.userCoords.lngStart};
          // Change name coords addres to name place
          this.geocoder.geocode({'location': this.LatLng1}, (results, status) => {
            if (status === 'OK') {
              this.nameStart = results[0].formatted_address;
              this.userService.user.nameStarted = this.nameStart;
            }
          });

   this.LatLng2 = {lat: this.userService.user.userCoords.latEnd, lng: this.userService.user.userCoords.lngEnd};
      // Change name coords addres to name place
      this.geocoder.geocode({'location': this.LatLng2}, (results, status) => {
        if (status === 'OK') {
          this.nameEnd = results[0].formatted_address;
          this.userService.user.nameEnded = this.nameEnd;
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
