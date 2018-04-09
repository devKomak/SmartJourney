import { User } from './shared/user';
import { OnInit, Injectable } from '@angular/core';

@Injectable()
export class UserService implements OnInit {

  private users: User[];
  private userId: number;

  constructor() {
    this.users = new Array<User>();
    this.userId = 0;
    this.users.push(new User(this.userId, {let: 2222} , 2 , {b: 4444} ));
  }

  ngOnInit() {
  }

  addUserCoords(userCoords: Object) {
    this.users[0].userCoords = userCoords;
  }

  addPeople(people: number) {
    this.users[0].people = people;
  }
  addUserData( dates: Object) {
    this.users[0].dates = dates;
  }

  getUsers() {
    return this.users;
  }


}
