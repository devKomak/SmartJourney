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



  @ViewChild('inputPeople') inputPeople: ElementRef;
  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;


  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }


}
