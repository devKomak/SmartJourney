import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../shared/user';
import { UserService } from '../../users.service';
import { ActivatedRoute, Router } from '@angular/router';

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


  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.users = this.userService.getUsers();

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
