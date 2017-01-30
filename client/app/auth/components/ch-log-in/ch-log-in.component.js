import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import template from './ch-log-in.template.html';
import { UserService } from '../../services/user/user.service';
import { validatorFactory } from '../../../validator';
import styles from './ch-log-in.stylesheet.scss';

@Component({
  selector: 'ch-log-in',
  template: template,
  styles: [styles]
})
export class ChLogInComponent {

  constructor(userService: UserService, builder: FormBuilder, router: Router) {
    this._userService = userService;
    this._router = router;
    this.error = '';

    this.loginForm = builder.group({
      Email: ['', [Validators.required, validatorFactory('email')]],
      Password: ['', Validators.required]
    });
  }

  onSubmit(credentials) {
    this.error = '';
    this._userService.login(credentials).subscribe(
      result => {
        if (result.success === true) {
          this.error = '';
          this._router.navigate(['']);
        } else if (result.success === false) {
          debugger;
          this.error = result.message;
        }
      },
      err => this.error = 'Login failed'
    );
  }
}
