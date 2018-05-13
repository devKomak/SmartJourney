import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../users.service';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  uid;
  journeys;
  displayName: string;
  photoUrl: string;
  email: string;
  lastTime: string;
  length: number;

  constructor(private userService: UserService, private auth: AuthService) {
    this.uid = '';
   }

  ngOnInit() {
    this.journeys = [];
    this.uid = this.auth.getUid;
    this.displayName = this.auth.userDetails.displayName;
    this.photoUrl = this.auth.userDetails.photoURL;
    this.email = this.auth.userDetails.email;
    this.lastTime = this.auth.userDetails.metadata.lastSignInTime;

    this.userService.getJourneys().subscribe(message => {
      this.journeys = [];
      this.journeys = this.userService.summaryJourneys;
      this.length = this.journeys.length;
    });
  }

}
