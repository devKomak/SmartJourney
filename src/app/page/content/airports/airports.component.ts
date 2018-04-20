import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {Location} from '@angular/common'
import { Airport } from '../../../shared/airport';
import { UserService } from '../../../users.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
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
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['position', 'airportName', 'cityName', 'distance'];
  
  constructor(private location: Location, private userService: UserService) {
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

    for(let i = 0; i < tab.length; i ++){
      this.newTab.push(
        {
          position:i+1,
          airportName:tab[i].airport_name,
          cityName: tab[i].city_name,
          distance: tab[i].distance
        }
      );
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
