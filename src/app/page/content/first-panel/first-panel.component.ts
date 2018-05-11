import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../users.service';
import { User } from '../../../shared/user';
import { NgForm, FormControl, FormGroupDirective, FormGroup, FormBuilder } from '@angular/forms';
import { Dates } from '../../../shared/dates';
import { Airport } from '../../../shared/airport';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { MatInput, ErrorStateMatcher, MatDatepicker, MatDatepickerInput } from '@angular/material';
const moment = _rollupMoment || _moment;
import { Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { MapsAPILoader } from '@agm/core';
import { Input } from '@angular/compiler/src/core';

@Component({
  selector: 'app-first-panel',
  templateUrl: './first-panel.component.html',
  styleUrls: ['./first-panel.component.css']
})

export class FirstPanelComponent implements OnInit {

  public latitudeStart: number;
  public longitudeStart: number;
  public latitudeEnd: number;
  public longitudeEnd: number;
  public searchControlStart: FormControl;
  public searchControlEnd: FormControl;
  public zoom: number;
  public geocoder;
  public LatLng;
  public text: String;
  public getMyLocation;
  public dir;
  public userCoords;
  public LatLngBounds;
  public isTwoCoords;
  public positionStart;
  public positionEnd;
  public currentPosition = false;
  public valueStart: String;
  dateError;
  @ViewChild('searchStart')
  public searchElementStartRef: ElementRef;
  @ViewChild('searchEnd')
  public searchElementEndRef: ElementRef;
  public errorMessage;
  public dates: Dates;
  public people: number;
  public airports: Airport[];
  public isAirports: Boolean;
  public isEndAirport: Boolean;
  public minDateStart = new Date();
  public minDateEnd = new Date();
  public started: boolean;
  public markerCheck;
  public error;
  dataForm: FormGroup;
  isOrigin = new Subject<FormControl>();

  @ViewChild('inputPeople') inputPeople: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private userService: UserService,
    private router: Router, private fb: FormBuilder) {

    this.minDateStart.setDate(this.minDateStart.getDate() + 1);
    this.minDateEnd.setDate(this.minDateStart.getDate() + 1);
    this.isAirports = false;
    this.isEndAirport = false;
    this.started = false;
    this.markerCheck = 0;
  }

  zoomChange(f: any) {
    console.log(f);
  }


  change(startDate: MatDatepickerInput<this>) {
    console.log(startDate);
  }

  ngOnInit() {
    this.dataForm  = new FormGroup({
      'people': new FormControl(1, [Validators.required,
        Validators.min(1),
        Validators.max(5)]),
      'startDate': new FormControl(moment(), Validators.required),
      'endDate': new FormControl(moment(), Validators.required),
      'origin': new FormControl(this.searchControlStart, Validators.required),
      'destination': new FormControl(this.searchControlEnd, Validators.required)
    });

    // set google maps defaults
    this.zoom = 6;
    this.latitudeStart = 0;
    this.longitudeStart = 0;
    this.latitudeEnd = 0;
    this.longitudeEnd = 0;
    this.text = '';
    this.isTwoCoords = false;
    this.positionStart = false;
    this.positionEnd = false;
    this.userCoords = {};
    this.valueStart = '';

    // create search FormControl
    this.searchControlStart = new FormControl();
    this.searchControlEnd = new FormControl();

    // Geolocation HTML5
    this.getMyLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.geocoder =  new google.maps.Geocoder;
          this.latitudeStart = position.coords.latitude;
          this.longitudeStart = position.coords.longitude;
          this.LatLng = {lat: this.latitudeStart, lng: this.longitudeStart};
          this.LatLngBounds = new google.maps.LatLngBounds();

          // Change name coords addres to name place
          this.geocoder.geocode({'location': this.LatLng}, (results, status) => {
            if (status === 'OK') {
              this.text = results[0].formatted_address;
              this.valueStart = this.text;

            }
          });

           if (this.currentPosition === false && this.positionEnd === false) {
            this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeStart, this.longitudeStart));
          }

          if (this.positionStart === true && this.positionEnd === true) {
            this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeStart, this.longitudeStart));
            this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeEnd, this.longitudeEnd));
          }

          if (this.positionEnd === true) {
            this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeStart, this.longitudeStart));
            this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeEnd, this.longitudeEnd));
          }

          if (this.positionEnd === false && this.positionStart === true) {
            this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeStart, this.longitudeStart));
            this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeEnd, this.longitudeEnd));
          }

          this.userCoords = { latStart: this.latitudeStart, lngStart: this.longitudeStart,
                              latEnd: this.latitudeEnd, lngEnd: this.longitudeEnd };
          this.userService.addUserCoords(this.userCoords);
          this.positionStart = true;
          this.currentPosition = true;
        });
      }

    };

    // load Start Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementStartRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {

          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitudeStart = place.geometry.location.lat();
          this.longitudeStart = place.geometry.location.lng();
          this.LatLngBounds = new google.maps.LatLngBounds();

          this.currentPosition = false;
          if (this.searchElementStartRef.nativeElement.value.length !== 0 && this.searchElementEndRef.nativeElement.value.length === 0) {
            this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeStart, this.longitudeStart));
          }

          if (this.searchElementStartRef.nativeElement.value.length !== 0 && this.searchElementEndRef.nativeElement.value.length !== 0) {
            this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeStart, this.longitudeStart));
            this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeEnd, this.longitudeEnd));
          }

        });
          this.userCoords = { latStart: this.latitudeStart, lngStart: this.longitudeStart,
          latEnd: this.latitudeEnd, lngEnd: this.longitudeEnd };
          console.log(this.userCoords);
          this.userService.addUserCoords(this.userCoords);
          this.positionStart = true;
          this.currentPosition = false;
      });
    });

    // load End Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        const autocomplete1 = new google.maps.places.Autocomplete(this.searchElementEndRef.nativeElement);
        autocomplete1.addListener('place_changed', () => {
          this.ngZone.run(() => {
            const place: google.maps.places.PlaceResult = autocomplete1.getPlace();

            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            this.latitudeEnd = place.geometry.location.lat();
            this.longitudeEnd = place.geometry.location.lng();
            this.LatLngBounds = new google.maps.LatLngBounds();

            if (this.searchElementStartRef.nativeElement.value.length === 0 && this.searchElementEndRef.nativeElement.value.length !== 0) {
              this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeEnd, this.longitudeEnd));

                        }

            if (this.searchElementStartRef.nativeElement.value.length !== 0 &&
                this.searchElementEndRef.nativeElement.value.length !== 0 && this.currentPosition === false) {
                  this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeStart, this.longitudeStart));
                  this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeEnd, this.longitudeEnd));
            }

            if (this.positionStart === true) {
              this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeStart, this.longitudeStart));
              this.LatLngBounds.extend(new google.maps.LatLng(this.latitudeEnd, this.longitudeEnd));
            }

          });

          this.userCoords = { latStart: this.latitudeStart, lngStart: this.longitudeStart,
          latEnd: this.latitudeEnd, lngEnd: this.longitudeEnd };
          this.userService.addUserCoords(this.userCoords);
          this.isTwoCoords = true;
          this.positionEnd = true;
        });
      });

  }

  addDates() {
    this.dates = new Dates(this.startDate.nativeElement.value, this.endDate.nativeElement.value);
    this.userService.addUserDates(this.dates);

  }

  addPeople() {
    this.people = this.inputPeople.nativeElement.value;
    this.userService.addPeople(this.people);
  }

  onSubmit() {

      if (this.dataForm.get('startDate').value._d > this.dataForm.get('endDate').value._d) {
        this.dateError = true;
      } else {
        this.dateError = false;
      }

      console.log(this.positionStart + ' ' + this.positionEnd);
      if(this.positionStart && this.positionEnd){
        this.markerCheck = true;
      }else {    this.markerCheck = false;}

      if (this.dataForm.valid && this.dateError === false && this.markerCheck) {
      this.started = true;
      this.addDates();
      this.addPeople();
      this.userService.getAirports().subscribe(message => {},
      error => {
        console.log(error);
      });
      this.userService.subject1.asObservable().subscribe(message => {
        this.isAirports = message;
        if (this.isAirports && this.isEndAirport) { this.router.navigate(['airports']); }
      });

      this.userService.getAirportEnd();
      this.userService.subject2.asObservable().subscribe(message => {
        this.isEndAirport = message;
        if (this.isAirports && this.isEndAirport) { this.router.navigate(['airports']); }
      });

    }
  }

}

