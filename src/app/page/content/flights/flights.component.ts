import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserService } from '../../../users.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit, AfterViewInit {

  public newTab;
  selection = new SelectionModel<Element>(false, []);
  public ELEMENT_DATA: Element[] ;
  public dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public choosedOutBoundFlight;
  public started: boolean;

  displayedColumns = ['select', 'price', 'flightNumber', 'departs_at', 'arrives_at', 'origin', 'destination', 'airline'];
  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {

    console.log(this.userService.resultsFlights);

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
  }

  next() {
    if (this.choosedOutBoundFlight) {
      this.started = true;
      this.userService.addInboundFlight(this.choosedOutBoundFlight);
      this.userService.isInBoundFlightSubject.asObservable().subscribe(message => {
        if (message === true) { console.log('truesss'); this.router.navigate(['']); }
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
        console.log(tab[i].itineraries.length);
        departsT[i][j] = new Array(6);
        for (let k = 0; k < tab[i].itineraries[j].inbound.flights.length; k++) {
          console.log(j + ' ' + k + ' ' + i);
          departsT[i][j][k] = tab[i].itineraries[j].inbound.flights[k].departs_at.toString() + '\n';
          arrivesT[i][k] = tab[i].itineraries[j].inbound.flights[k].arrives_at.toString() + '\n';
          originT[i][k] = tab[i].itineraries[j].inbound.flights[k].origin.airport.toString() ;
          destinationT[i][k] =  tab[i].itineraries[j].inbound.flights[k].destination.airport.toString();
          flightNumber[i][k] =  tab[i].itineraries[j].inbound.flights[k].flight_number.toString();
          airline[i][k] =  tab[i].itineraries[j].inbound.flights[k].operating_airline.toString();
    }

    this.newTab.push(
      {
        price: tab[i].fare.total_price,
        departs_at: departsT[i][j],
        arrives_at: arrivesT[i],
        origin: originT[i],
        destination: destinationT[i],
        flightNumber: flightNumber[i],
        airline:  airline[i]
      }
    );
  }

  console.log(departsT);
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

export interface Result {
  currency: string;
  results?: (ResultsEntity)[] | null;
}
export interface ResultsEntity {
  itineraries?: (ItinerariesEntity)[] | null;
  fare: Fare;
}
export interface ItinerariesEntity {
  outbound: Outbound;
  inbound: Inbound;
}
export interface Outbound {
  flights?: (FlightsEntity)[] | null;
}
export interface FlightsEntity {
  departs_at: string;
  arrives_at: string;
  origin: OriginOrDestination;
  destination: DestinationOrOrigin;
  marketing_airline: string;
  operating_airline: string;
  flight_number: string;
  aircraft: string;
  booking_info: BookingInfo;
}
export interface OriginOrDestination {
  airport: string;
  terminal?: string | null;
}
export interface DestinationOrOrigin {
  airport: string;
}
export interface BookingInfo {
  travel_class: string;
  booking_code: string;
  seats_remaining: number;
}
export interface Inbound {
  flights?: (FlightsEntity1)[] | null;
}
export interface FlightsEntity1 {
  departs_at: string;
  arrives_at: string;
  origin: OriginOrDestination;
  destination: OriginOrDestination;
  marketing_airline: string;
  operating_airline: string;
  flight_number: string;
  aircraft: string;
  booking_info: BookingInfo;
}
export interface Fare {
  total_price: string;
  price_per_adult: PricePerAdult;
  restrictions: Restrictions;
}
export interface PricePerAdult {
  total_fare: string;
  tax: string;
}
export interface Restrictions {
  refundable: boolean;
  change_penalties: boolean;
}

