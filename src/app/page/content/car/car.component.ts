import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../users.service';
import { Provider } from '@angular/compiler/src/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  providers: Provider[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.providers = this.userService.user.provider;
  }

}
