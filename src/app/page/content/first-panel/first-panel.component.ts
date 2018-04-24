import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../users.service';
import { User } from '../../../shared/user';
import { NgForm, FormControl, FormGroupDirective, FormGroup, FormBuilder } from '@angular/forms';
import { Dates } from '../../../shared/dates';
import { Airport } from '../../../shared/airport';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { MatInput, ErrorStateMatcher } from '@angular/material';
const moment = _rollupMoment || _moment;
import { Validators } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { MapsAPILoader } from '@agm/core';

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

  @ViewChild('searchStart')
  public searchElementStartRef: ElementRef;
  @ViewChild('searchEnd')
  public searchElementEndRef: ElementRef;

  public dates: Dates;
  public people: number;
  public airports: Airport[];
  public isAirports: Boolean;
  public isEndAirport: Boolean;
  public minDateStart = new Date();
  public minDateEnd = new Date();
  public started: boolean;
  dataForm: FormGroup;
  isOrigin = new Subject<FormControl>();

  @ViewChild('inputPeople') inputPeople: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;



  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private userService: UserService,
    private router: Router, private fb: FormBuilder) {

    this.minDateStart.setDate(this.minDateStart.getDate() + 1);
    this.minDateEnd.setDate(this.minDateEnd.getDate() + 1);
    this.isAirports = false;
    this.isEndAirport = false;
    this.started = false;
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
    this.latitudeStart = 8;
    this.longitudeStart = 5;
    this.latitudeEnd = 8;
    this.longitudeEnd = 5;
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

          // Change name coords addres to name place
          this.geocoder.geocode({'location': this.LatLng}, (results, status) => {
            if (status === 'OK') {
              this.text = results[0].formatted_address;
              this.valueStart = this.text;
              // Route beetwen markers
              // this.dir = {
              //   origin: { lat: this.latitudeStart, lng: this.longitudeStart },
              //   destination: { lat: this.latitudeEnd, lng: this.longitudeEnd }
              // };
            }
          });

           if (this.currentPosition === false && this.positionEnd === false) {
            this.LatLngBounds = new google.maps.LatLngBounds(new google.maps.LatLng(this.latitudeStart, this.longitudeStart));
            console.log('ff1');
          }

          if (this.positionStart === true && this.positionEnd === true) {
            this.LatLngBounds = new google.maps.LatLngBounds(new google.maps.LatLng(this.latitudeStart, this.longitudeStart),
            new google.maps.LatLng(this.latitudeEnd, this.longitudeEnd));
            console.log('ff2');
          }

          if (this.positionEnd === true) {
            this.LatLngBounds = new google.maps.LatLngBounds( new google.maps.LatLng(this.latitudeEnd, this.longitudeEnd),
            new google.maps.LatLng(this.latitudeStart, this.longitudeStart),
             );
            console.log('ff3');
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
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude and zoom
          this.latitudeStart = place.geometry.location.lat();
          this.longitudeStart = place.geometry.location.lng();

          // Route beetwen markers
          //   this.dir = {
          //   origin: { lat: this.latitudeStart, lng: this.longitudeStart },
          //   destination: { lat: this.latitudeEnd, lng: this.longitudeEnd }
          // };
          this.currentPosition = false;
          if (this.searchElementStartRef.nativeElement.value.length !== 0 && this.searchElementEndRef.nativeElement.value.length === 0) {
            this.LatLngBounds = new google.maps.LatLngBounds(new google.maps.LatLng(this.latitudeStart, this.longitudeStart));
            console.log('ff1');
          }

          if (this.searchElementStartRef.nativeElement.value.length !== 0 && this.searchElementEndRef.nativeElement.value.length !== 0) {
            this.LatLngBounds = new google.maps.LatLngBounds(new google.maps.LatLng(this.latitudeStart, this.longitudeStart),
            new google.maps.LatLng(this.latitudeEnd, this.longitudeEnd));
            console.log('ff2');
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

      // load Places Autocomplete END
      this.mapsAPILoader.load().then(() => {
        const autocomplete1 = new google.maps.places.Autocomplete(this.searchElementEndRef.nativeElement);
        autocomplete1.addListener('place_changed', () => {
          this.ngZone.run(() => {
            // get the place result
            const place: google.maps.places.PlaceResult = autocomplete1.getPlace();

            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            // set latitude, longitude and zoom
            this.latitudeEnd = place.geometry.location.lat();
            this.longitudeEnd = place.geometry.location.lng();
            // Route beetwen markers
            //   this.dir = {
            //   origin: { lat: this.latitudeStart, lng: this.longitudeStart },
            //   destination: { lat: this.latitudeEnd, lng: this.longitudeEnd }
            // };

            if (this.searchElementStartRef.nativeElement.value.length === 0 && this.searchElementEndRef.nativeElement.value.length !== 0) {
              this.LatLngBounds = new google.maps.LatLngBounds(new google.maps.LatLng(this.latitudeEnd, this.longitudeEnd));
              console.log('ff1End');
            }

            if (this.searchElementStartRef.nativeElement.value.length !== 0 &&
                this.searchElementEndRef.nativeElement.value.length !== 0 && this.currentPosition === false) {
              this.LatLngBounds = new google.maps.LatLngBounds(new google.maps.LatLng(this.latitudeEnd, this.longitudeEnd),
              new google.maps.LatLng(this.latitudeStart, this.longitudeStart));
              console.log('ff2End');
            }

            if (this.positionStart === true) {
              this.LatLngBounds = new google.maps.LatLngBounds( new google.maps.LatLng(this.latitudeEnd, this.longitudeEnd),
              new google.maps.LatLng(this.latitudeStart, this.longitudeStart),
             );
              console.log('ff3End');
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

  setEndDate(event) {
    this.minDateEnd.setDate(this.minDateStart.getDate());
  }

  setStartDate(event: any) {
    const day = event.value._i.date;
    const month = event.value._i.month;
    const year = event.value._i.year;
    const dateTemp = new Date(event.value._i.year, event.value._i.month, event.value._i.date);
    this.minDateStart.setDate(dateTemp.getDate());
    this.startDate.nativeElement.min = dateTemp;
  }

  onSubmit() {

      if (this.dataForm.valid) {
      this.started = true;
      this.addDates();
      this.addPeople();
      this.userService.getAirports();
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

  addDates() {
    this.dates = new Dates(this.startDate.nativeElement.value, this.endDate.nativeElement.value);
    this.userService.addUserDates(this.dates);

  }


  addPeople() {
    this.people = this.inputPeople.nativeElement.value;
    this.userService.addPeople(this.people);
  }
}
