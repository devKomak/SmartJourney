import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../shared/user';
import { UserService } from '../users.service';
import { MatDatepicker } from '@angular/material';

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

  addDate() {

    console.log(this.startD);
    this.userService.addUserData(new Object({start: this.startDate.nativeElement.value, end: this.endDate.nativeElement.value}));
  }

  addPeople(event: any) {
    this.userService.addPeople(event.data);
    console.log(event.data);
  }

}
