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
  
}