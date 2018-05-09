import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../../../users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../shared/user';
import {Location} from '@angular/common';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  isLinear = false;

  user: User;
  public geocoder;
  public nameStart;
  public nameEnd;
  public LatLng1;
  public LatLng2;
  state;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private userService: UserService, private _formBuilder: FormBuilder,
               private activatedRoute: ActivatedRoute, private location: Location) {
      this.activatedRoute.params.subscribe(params => {
      this.user = this.userService.summaryJourneys[params['id']];
      this.nameStart = this.user.nameStarted;
      this.nameEnd = this.user.nameEnded;
      console.log(this.user);

    });
   }

   back() {
     this.location.back();
   }

  ngOnInit() {

      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });



  }


}
