import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../users.service';
import { User } from '../../../shared/user';
import { NgForm, FormControl } from '@angular/forms';
import { Dates } from '../../../shared/dates';
import { Airport } from '../../../shared/airport';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { MatInput } from '@angular/material';
const moment = _rollupMoment || _moment;


@Component({
  selector: 'app-first-panel',
  templateUrl: './first-panel.component.html',
  styleUrls: ['./first-panel.component.css']
})
export class FirstPanelComponent implements OnInit {

  public dates: Dates;
  public people: number;
  public airports: Airport[];
  public isAirports: Boolean;
  public isEndAirport: Boolean;
  date = new FormControl(moment());
  public minDateStart = new Date();
  public minDateEnd = new Date();
  public started: boolean;

  @ViewChild('inputPeople') inputPeople: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;

  constructor(private userService: UserService, private router: Router) {

    this.minDateStart.setDate(this.minDateStart.getDate() + 1);
    this.minDateEnd.setDate(this.minDateEnd.getDate() + 1);
    this.isAirports = false;
    this.isEndAirport = false;
    this.started = false;
  }

  ngOnInit() {


  }

  setEndDate(event) {
    this.minDateEnd.setDate(this.minDateStart.getDate());
    console.log(event);
  }

  setStartDate(event: any) {
    const day = event.value._i.date;
    const month = event.value._i.month;
    const year = event.value._i.year;
    const dateTemp = new Date(event.value._i.year, event.value._i.month, event.value._i.date);
    this.minDateStart.setDate(dateTemp.getDate());
    this.startDate.nativeElement.min = dateTemp;
    console.log(this.startDate.nativeElement.min);
    console.log(this.startDate.nativeElement);
  }

  onSubmit(f: NgForm) {
    if (f.valid === true) {
      this.started = true;
      console.log(this.started);
      this.addDates();
      this.addPeople();
      this.userService.getAirports();
      this.userService.subject1.asObservable().subscribe(message => {
        this.isAirports = message;
        if (this.isAirports && this.isEndAirport) { this.router.navigate(['airports']); }
      });

      this.userService.getAirportEnd();
      this.userService.subject2.asObservable().subscribe(message => {
        this.isEndAirport = message;
        if (this.isAirports && this.isEndAirport) { this.router.navigate(['airports']); }
      });


    }
  }

  addDates() {
    this.dates = new Dates(this.startDate.nativeElement.value, this.endDate.nativeElement.value);
    this.userService.addUserDates(this.dates);

  }


  addPeople() {
    this.people = this.inputPeople.nativeElement.value;
    this.userService.addPeople(this.people);
  }
}
