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
}