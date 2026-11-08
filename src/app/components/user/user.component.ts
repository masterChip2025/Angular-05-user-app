import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
})
export class UserComponent {
  @Input() users: User[] = [];
  @Output() idUserEventEmitter: EventEmitter<number> = new EventEmitter();
  @Output() selectedUserEvent: EventEmitter<User> = new EventEmitter();

  onRemoveUser(id: number): void {
    console.log({ id });
    this.idUserEventEmitter.emit(id);
  }

  onChangeUser(user: User): void {
    console.log({ user });
    this.selectedUserEvent.emit(user);
  }
}
