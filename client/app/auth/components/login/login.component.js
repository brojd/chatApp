import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import template from './login.template.html';
import { UserService } from '../../services/user/user.service';
import { validatorFactory } from '../../../validator';
import styles from './login.stylesheet.scss';

@Component({
  selector: 'login',
  template: template,
  styles: [styles]
})
export class LoginComponent {

  constructor(userService: UserService, builder: FormBuilder, router: Router) {
    this._userService = userService;
    this._router = router;
    this.error = '';

    this.loginForm = builder.group({
      Login: ['', [Validators.required, validatorFactory('email')]],
      Password: ['', Validators.required]
    });
  }

  onSubmit(credentials) {
    this._userService.login(credentials).subscribe(
      result => {
        if (result) {
          this.error = '';
          this._router.navigate(['']);
        }
      },
      err => {
        if (err.status === 401) {
          this.error = 'Invalid login or password';
        }
      });
  }
}
