import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../shared/user';
import { UserService } from '../users.service';

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

  constructor(private userService: UserService) {
  }

  newJourney() {

    this.userService.addUser(this.userCoords,
                             this.inputPeople.nativeElement.value,
                             {startDate: this.startDate.nativeElement.value , endDate: this.endDate.nativeElement.value});
  }

  getUserCoords(event: any) {
    this.userCoords = event;
  }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }


}
