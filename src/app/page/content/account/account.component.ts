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


  constructor(private userService: UserService, private auth: AuthService) {
    this.uid = '';
   }

  ngOnInit() {
    this.uid = this.auth.getUid;
    this.userService.getJourneys().subscribe(message => {
      console.log(this.userService.summaryJourneys);
      this.journeys = [];
      this.journeys = this.userService.summaryJourneys;
    });
  }

}
