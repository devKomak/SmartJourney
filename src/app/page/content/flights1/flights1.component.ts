import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from '../../../users.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights1',
  templateUrl: './flights1.component.html',
  styleUrls: ['./flights1.component.css']
})
export class Flights1Component implements OnInit, AfterViewInit {

  public newTab;
  selection = new SelectionModel<Element>(false, []);
  public ELEMENT_DATA: Element[];
  public dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public choosedOutBoundFlight;
  public started: boolean;

  displayedColumns = ['select', 'price', 'flightNumber', 'departs_at', 'arrives_at', 'origin', 'destination', 'airline'];
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {

    this.started = false;
   this.createTable();
   this.ELEMENT_DATA = this.newTab;
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
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
    this.choosedOutBoundFlight = event;
    console.log(this.choosedOutBoundFlight);
  }

  next() {
     if (this.choosedOutBoundFlight) {
       this.started = true;
       this.userService.addOutBoundFlight(this.choosedOutBoundFlight);
       this.userService.getCars().subscribe();

       this.userService.isCars.asObservable().subscribe(message => {
        if (message === true) {  this.router.navigate(['cars']); }
      });

     }
  }

  createTable() {
    const tab = this.userService.resultsFlights;
    this.newTab = new Array();
    const arrives = new Array();
    const arrivesT = new Array();
    const departs = new Array();
    const departsT = new Array();
    const origin = new Array();
    const originT = new Array();
    const destination = new Array();
    const destinationT = new Array();
    const flightNumber = new Array();
    const airline = new Array();

    for (let i = 0; i < tab.length; i++) {
      departsT[i] = new Array(6);
        arrivesT[i] = new Array(6);
        originT[i] = new Array(6);
        destinationT[i] = new Array(6);
        flightNumber[i] = new Array(6);
        airline[i] = new Array(6);
      for (let j = 0; j < tab[i].itineraries.length; j++) {
        departsT[i][j] = new Array(6);
        arrivesT[i][j] = new Array(6);
        for (let k = 0; k < tab[i].itineraries[j].outbound.flights.length; k++) {
          departsT[i][j][k] = tab[i].itineraries[j].outbound.flights[k].departs_at.toString() + '\n';
          arrivesT[i][j][k] = tab[i].itineraries[j].outbound.flights[k].arrives_at.toString() + '\n';
          originT[i][k] = tab[i].itineraries[j].outbound.flights[k].origin.airport.toString() ;
          destinationT[i][k] =  tab[i].itineraries[j].outbound.flights[k].destination.airport.toString();
          flightNumber[i][k] =  tab[i].itineraries[j].outbound.flights[k].flight_number.toString();
          airline[i][k] =  tab[i].itineraries[j].outbound.flights[k].operating_airline.toString();
    }

    this.newTab.push(
      [
        {
        price: tab[i].fare.total_price,
        departs_at: departsT[i][j],
        arrives_at: arrivesT[i][j],
        origin: originT[i],
        destination: destinationT[i],
        flightNumber: flightNumber[i],
        airline: airline[i],
        },
      ]
    );
  }
  }
}
}

export interface Element {
  departs_at: string;
  price: string;
  arrives_at: string;
  origin: string;
  destination: string;
  flightNumber: string;
  airline: string;
}
