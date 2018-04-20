import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {Location} from '@angular/common'
import { Airport } from '../../../shared/airport';
import { UserService } from '../../../users.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {} from '@types/googlemaps';
@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit, AfterViewInit {

  public newTab;
  public ELEMENT_DATA: Element[] ;
  public dataSource;
  public airports: Airport[];
  public markers:marker[];
  public tt;
  public LatLngBounds;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  lat: number = 51.678418;
  lng: number = 7.809007;


  displayedColumns = ['position', 'airportName', 'cityName', 'distance'];
  
  constructor(private location: Location, private userService: UserService) {
    this.LatLngBounds = new google.maps.LatLngBounds();
    this.createTable();
    this.ELEMENT_DATA = this.newTab;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
   }

  ngOnInit() {
   
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  createTable(){
    let tab = this.userService.showAirports();
    this.newTab = new Array();
    this.markers = new Array();
    let coord = this.userService.getUserCoords();

    this.markers.push({
      lat: coord.latStart,
      lng: coord.lngStart,
      label: 'YOU'
    })

    for(let i = 0; i < tab.length; i ++){
      this.newTab.push(
        {
          position:i+1,
          airportName:tab[i].airport_name,
          cityName: tab[i].city_name,
          distance: tab[i].distance
        }
      );

      this.markers.push({
        lat: tab[i].location.latitude,
        lng: tab[i].location.longitude,
        label: (i+1).toString()
      })

      this.LatLngBounds.extend(new google.maps.LatLng(tab[i].location.latitude,tab[i].location.longitude));
    }

  }

  onBack() {
    this.location.back();

  }

}

export interface Element {
  airportName: string;
  position: number;
  cityName: number;
  distance: string;
}

interface marker {
	lat: number;
	lng: number;
	label?: string;
}