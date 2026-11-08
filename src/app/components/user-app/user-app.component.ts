import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { RouterOutlet, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'user-app',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css'],
})
export class UserAppComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private sharingDataService: SharingDataService,
  ) {}

  ngOnInit(): void {
    this.userService.findAll().subscribe((users) => (this.users = users));
    this.addUser();
    this.removeUsert();
  }

  addUser(): void {
    this.sharingDataService.newUserEventEmitter.subscribe((user) => {
      if (user.id > 0) {
        this.users = this.users.map((u) =>
          u.id === user.id ? { ...user } : u,
        );
      } else {
        this.users = [...this.users, { ...user, id: new Date().getTime() }];
      }
      this.router.navigate(['/users'], { state: this.users });
      Swal.fire({
        title: 'Guardado!',
        text: 'El usuario ha sido guardado con exíto!',
        icon: 'success',
      });
    });
  }

  removeUsert(): void {
    this.sharingDataService.idUserEventEmitter.subscribe((id) => {
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
          this.router
            .navigate(['users/create'], { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/users'], {
                state: { users: this.users },
              });
            });
          Swal.fire({
            title: 'Elimianar Usuario!',
            text: 'El usuario se elimino con exito.',
            icon: 'success',
          });
        }
      });
    });
  }
}
