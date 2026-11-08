import { Component, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',
})
export class FormUserComponent {
  user: User;

  constructor(
    private sharingDataService: SharingDataService,
    private router: Router,
  ) {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.user = this.router.getCurrentNavigation()?.extras.state!['user'];
    } else {
      this.user = new User();
    }
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.sharingDataService.newUserEventEmitter.emit(this.user);
    }
    userForm.reset();
    userForm.resetForm();
  }

  onClear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }
}
