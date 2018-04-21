import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild,
         AfterViewInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { UserService } from '../../../../users.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})

export class AutocompleteComponent implements OnInit {

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

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private userService: UserService) {
  }


  ngOnInit() {
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



}


