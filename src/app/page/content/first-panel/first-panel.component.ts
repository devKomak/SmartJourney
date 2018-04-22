import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../users.service';
import { User } from '../../../shared/user';
import { NgForm, FormControl } from '@angular/forms';
import { Dates } from '../../../shared/dates';
import { Airport } from '../../../shared/airport';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
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
  
  @ViewChild('inputPeople') inputPeople: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;

  constructor(private userService: UserService, private router: Router) {

    this.isAirports = false;
    this.isEndAirport = false;
  }

  ngOnInit() {
    

  }

  onSubmit(f: NgForm) {
    if(f.valid == true){
      this.addDates();
      this.addPeople();
      this.userService.getAirports();
      this.userService.subject1.asObservable().subscribe(message =>{
        this.isAirports = message;
        if(this.isAirports && this.isEndAirport) this.router.navigate(['airports']);
      });

      this.userService.getAirportEnd();
      this.userService.subject2.asObservable().subscribe(message =>{
        this.isEndAirport = message;
        if(this.isAirports && this.isEndAirport) this.router.navigate(['airports']);
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
