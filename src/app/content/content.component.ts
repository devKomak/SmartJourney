import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../shared/user';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public users: User[];
  public userCoords;
  @ViewChild('inputPeople') inputPeople: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;
  public people: number;
  public dates;

  constructor() {
    this.users = new Array<User>();
  }

  newJourney() {
    this.people = this.inputPeople.nativeElement.value;
    this.dates = {startDate: this.startDate.nativeElement.value , endDate: this.endDate.nativeElement.value};
    this.users.push(new User(this.userCoords, this.people, this.dates));
    console.log(this.users[0].dates);
  }

  getUserCoords(event: any) {
    this.userCoords = event;
  }

  ngOnInit() {
  }


}
