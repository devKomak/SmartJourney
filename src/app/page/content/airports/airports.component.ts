import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {Location} from '@angular/common';
import { Airport } from '../../../shared/airport';
import { UserService } from '../../../users.service';
import {MatTableDataSource, MatSort, MatPaginator, MatCheckbox, MatCell, MatCellDef} from '@angular/material';
import {} from '@types/googlemaps';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
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
  public markers: Marker[];
  public tt;
  public LatLngBounds;
  public choosedAirport;
  public started: boolean;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  lat = 51.678418;
  lng = 7.809007;
  selection = new SelectionModel<Element>(false, []);

  displayedColumns = ['select', 'position', 'airportName', 'cityName', 'distance'];


  constructor(private location: Location, private userService: UserService, private router: Router) {
    this.LatLngBounds = new google.maps.LatLngBounds();
    this.createTable();
    this.ELEMENT_DATA = this.newTab;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.started = false;
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

click(event) {
  this.choosedAirport = event;
}

next() {
  if (this.choosedAirport) {
    this.started = true;
    this.userService.addAirport(this.choosedAirport);
    this.userService.getFlights();
    this.userService.isFlightsSubject.asObservable().subscribe(message => {
      if (message === true) {  this.router.navigate(['flights']); }
    });
  }
}

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => {
          this.selection.select(row);
          console.log(this.selection.select(row));
        });
  }

  createTable() {
    const tab = this.userService.showAirports();
    this.newTab = new Array();
    this.markers = new Array();
    const coord = this.userService.getUserCoords();

    this.markers.push({
      lat: coord.latStart,
      lng: coord.lngStart,
      label: '0'
    });

    for (let i = 0; i < tab.length; i ++) {
      this.newTab.push(
        {
          position: i + 1,
          airportName: tab[i].airport_name,
          cityName: tab[i].city_name,
          distance: tab[i].distance
        }
      );

      this.markers.push({
        lat: tab[i].location.latitude,
        lng: tab[i].location.longitude,
        label: (i + 1).toString()
      });

      this.LatLngBounds.extend(new google.maps.LatLng(tab[i].location.latitude, tab[i].location.longitude));
    }
  }
}

export interface Element {
  airportName: string;
  position: number;
  cityName: number;
  distance: string;
}

interface Marker {
lat: number;
lng: number;
label?: string;
}
