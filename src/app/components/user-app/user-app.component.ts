import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';
import { FormUserComponent } from '../form-user/form-user.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [UserComponent, FormUserComponent],
  templateUrl: './user-app.component.html',
})
export class UserAppComponent implements OnInit {
  title: string = 'Listado de usuarios.';
  users: User[] = [];
  userSelected: User;

  open: boolean = false;

  constructor(private userService: UserService) {
    this.userSelected = new User();
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe((users) => (this.users = users));
  }

  addUser(user: User): void {
    if (user.id > 0) {
      this.users = this.users.map((u) => {
        if (u.id === user.id) {
          return { ...user };
        }
        return u;
      });
    } else {
      this.users = [...this.users, { ...user }];
    }
    Swal.fire({
      title: 'Guardado!',
      text: 'El usuario ha sido guardado con exíto!',
      icon: 'success',
    });
    this.userSelected = new User();
    this.setOpen();
  }

  removeUsert(id: number): void {
    Swal.fire({
      title: 'Seguro que desea eliminar a este usuario?',
      text: 'Ciudado el usuario sera eliminado definitivamente si da click en Si, Eliminar.!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.users = this.users.filter((user) => user.id !== id);
        Swal.fire({
          title: 'Elimianar Usuario!',
          text: 'El usuario se elimino con exito.',
          icon: 'success',
        });
      }
    });
  }

  setSelectUser(userRow: User): void {
    console.log({ userRow });
    this.userSelected = { ...userRow };
    this.open = true;
  }

  setOpen(): void {
    this.open = !this.open;
  }
}
