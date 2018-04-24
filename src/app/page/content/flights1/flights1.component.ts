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
  
}

}