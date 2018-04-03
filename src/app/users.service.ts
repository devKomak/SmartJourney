import { User } from './shared/user';
import { OnInit } from '@angular/core';

export class UserService implements OnInit {

  private users: User[];
  private userId: number;

  constructor() {
    this.users = new Array<User>();
    this.userId = 0;
  }

  ngOnInit() {
  }

  addUser(userCoords: Object, people: number, dates: Object) {
    this.userId++;
    this.users.push(new User(this.userId, userCoords, people, dates));
    console.log(this.users);
  }

  getUsers() {
    return this.users;
  }


}
