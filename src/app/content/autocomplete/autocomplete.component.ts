import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, AfterViewInit, Input, OnChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps'; 

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
  public isEndPosition;
  public dir;

  @ViewChild("searchStart")
  public searchElementStartRef: ElementRef;
  
  @ViewChild("searchEnd")
  public searchElementEndRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    
  ) {
    this.isEndPosition = false;
  }
  
  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitudeStart = 39.8282;
    this.longitudeStart = -98.5795;
    this.text = "";

    //create search FormControl
    this.searchControlStart = new FormControl();
    this.searchControlEnd = new FormControl();

    this.getMyLocation = () =>{   
      
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitudeStart = position.coords.latitude;
          this.longitudeStart = position.coords.longitude;
          this.LatLng = {lat: this.latitudeStart, lng: this.longitudeStart};
          this.zoom = 12;

          this.geocoder =  new google.maps.Geocoder;
          this.geocoder.geocode({'location': this.LatLng}, (results,status) =>{
            if (status === 'OK') {
            this.text = results[0].formatted_address;
            this.searchElementStartRef.nativeElement.value = this.text;
            this.searchControlStart.value;
            }
          });

        });
      }
    }


    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementStartRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          this.latitudeStart = place.geometry.location.lat();
          this.longitudeStart = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

      //load Places Autocomplete END
      this.mapsAPILoader.load().then(() => {
        let autocomplete1 = new google.maps.places.Autocomplete(this.searchElementEndRef.nativeElement);
        autocomplete1.addListener("place_changed", () => {
          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete1.getPlace();
    
            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            
            //set latitude, longitude and zoom
            this.latitudeEnd = place.geometry.location.lat();
            this.longitudeEnd = place.geometry.location.lng();
            this.isEndPosition = true;
 
              this.dir = {
                origin: { lat: this.latitudeStart, lng: this.longitudeStart },
                destination: { lat: this.latitudeEnd, lng: this.longitudeEnd }
              }
            

          });
        });
      });

  }
  


}


