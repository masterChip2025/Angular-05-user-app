import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { SharingDataService } from '../../services/sharing-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form-user.component.html',
})
export class FormUserComponent implements OnInit {
  user: User;

  constructor(
    private sharingDataService: SharingDataService,
    private route: ActivatedRoute,
  ) {
    this.user = new User();
  }
  ngOnInit(): void {
    this.sharingDataService.selectUserEventEmitter.subscribe(
      (user) => (this.user = user),
    );

    this.route.paramMap.subscribe((params) => {
      const id: number = +(params.get('id') || '0');

      if (id > 0) {
        this.sharingDataService.findUserByIdEventEmitter.emit(id);
      }
    });
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
