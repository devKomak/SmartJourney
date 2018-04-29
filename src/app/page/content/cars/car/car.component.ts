import { Component, OnInit, Input, Provider } from '@angular/core';
import { UserService } from '../../../../users.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  @Input() price: number;
  providers: Provider;
  @Input() providerIndex: number;
  @Input() carIndex: number;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.providers = this.userService.user.provider;
    console.log(this.price);
  }

}
