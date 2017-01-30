import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import template from './ch-sign-up.template.html';
import { UserService } from '../../services/user/user.service';
import { validatorFactory } from '../../../validator';
import styles from './ch-sign-up.stylesheet.scss';

@Component({
  selector: 'ch-sign-up',
  template: template,
  styles: [styles]
})
export class ChSignUpComponent {

  constructor(userService: UserService, builder: FormBuilder, router: Router) {
    this._userService = userService;
    this._router = router;
    this.error = '';

    this.signupForm = builder.group({
      Nickname: ['', [Validators.required, Validators.pattern(/^\S*$/), Validators.minLength(3)]],
      Email: ['', [Validators.required, validatorFactory('email')]],
      Password: ['', Validators.required]
    });
  }

  onSubmit(credentials) {
    debugger;
    this._userService.signup(credentials).subscribe(
      result => {
        if (result) {
          this.error = '';
          this._router.navigate(['']);
        }
      },
      err => this.error = 'Signing up failed'
    );
  }
}
