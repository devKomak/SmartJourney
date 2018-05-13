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
  public cost;

  public doughnutChartLabels: string[];
  public doughnutChartData: number[];
  public doughnutChartType: string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;



  constructor(private userService: UserService, private _formBuilder: FormBuilder,
               private activatedRoute: ActivatedRoute, private location: Location) {
      this.activatedRoute.params.subscribe(params => {
      this.user = this.userService.summaryJourneys[params['id']];
      this.nameStart = this.user.nameStarted;
      this.nameEnd = this.user.nameEnded;

      this.doughnutChartLabels = ['Car', 'Hotel', 'Inbound flight', 'Outbound flight'];
      this.doughnutChartData = [this.user.choosedCar[0], this.user.choosedHotel.price, this.user.choosedInBoundFlight[0].price,
      this.user.choosedOutBoundFlight[0].price];
      this.doughnutChartType = 'doughnut';

      this.cost = Number(this.user.choosedCar[0]) + Number(this.user.choosedHotel.price) + Number(this.user.choosedInBoundFlight[0].price)
      + Number(this.user.choosedOutBoundFlight[0].price);

    });
   }

   back() {
     this.location.back();
   }
   public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
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
