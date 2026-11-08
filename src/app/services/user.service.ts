import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'David',
      lastName: 'Diaz',
      email: 'sinedindnd1@gmail.com',
      username: 'sinedin',
      password: 'Felipe2007',
    },
    {
      id: 2,
      name: 'Juanita',
      lastName: 'Kremer',
      email: 'juanita20206@gmail.com',
      username: 'Lakremer',
      password: 'Gomela2027',
    },
    {
      id: 3,
      name: 'Felipe',
      lastName: 'Diaz',
      email: 'DiegoFelipe@gmail.com',
      username: 'Pipesueños',
      password: 'MatematicasyVideojuegos',
    },
  ];

  constructor() {}
  findAll(): Observable<User[]> {
    return of(this.users);
  }
}
