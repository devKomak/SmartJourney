import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../users.service';
import { User } from '../../../shared/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-first-panel',
  templateUrl: './first-panel.component.html',
  styleUrls: ['./first-panel.component.css']
})
export class FirstPanelComponent implements OnInit {

  public users: User[];
  public startD;
  public endD;

  @ViewChild('inputPeople') inputPeople: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;

    minDate = new Date(2015, 0, 1);
    maxDate = new Date(2020, 0, 1);
    defaultPeople = 2;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.users = this.userService.getUsers();

  }

  onSubmit(f: NgForm) {
    console.log(f);

  }

  newJourney() {
    console.log(this.userService.getUsers());
    this.router.navigate(['airports']);
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
