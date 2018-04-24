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
}