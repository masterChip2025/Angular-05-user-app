import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',
})
export class FormUserComponent {
  @Input() user: User;

  @Output() newUserEventEmitter: EventEmitter<User> = new EventEmitter();
  @Output() openEventEmitter: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    this.user = new User();
  }

  onSubmit(userForm: NgForm): void {
    if (userForm.valid) {
      this.newUserEventEmitter.emit(this.user);
    }
    userForm.reset();
    userForm.resetForm();
    this.user = new User();
  }

  onClear(userForm: NgForm): void {
    this.user = new User();
    userForm.reset();
    userForm.resetForm();
  }

  onOpenClose(): void {
    this.openEventEmitter.emit();
  }
}
