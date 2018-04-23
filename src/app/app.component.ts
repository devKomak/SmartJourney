import { Component } from '@angular/core';
import { UserService } from './users.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate([''])
  }

}
