import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MatDatepicker } from '@angular/material';
import { User } from '../../shared/user';
import { UserService } from '../../users.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  public users: User[];
  public startD;
  public endD;

  @ViewChild('inputPeople') inputPeople: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;


  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.users = this.userService.getUsers();

  }

  newJourney() {
    console.log(this.userService.getUsers());
  }

  addStartDate(event: any) {
    this.startD = event.value;
    this.userService.addUserData({start: event.value, end: this.endD});
  }

  addEndDate(event: any) {
    this.endD = event.value;
    this.userService.addUserData({start: this.startD, end: event.value});
  }

  addPeople(event: any) {
    this.userService.addPeople(event.data);
    console.log(event.data);
  }

}
