import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import template from './ch-sign-up.template.html';
import { UserService } from '../../services/user/user.service';
import { validatorFactory } from '../../../validator';
import styles from './ch-sign-up.stylesheet.scss';
import { maxUploadAvatarLimitInBytes } from '../../../../config';

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
  
  handleUploadFile(event) {
    let file = event.target.files[0];
    if (file.size > maxUploadAvatarLimitInBytes) {
      alert('Upload file up to 1MB');
      event.target.value = '';
      return false;
    } else if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      alert('You can upload either .png or .jpeg files');
      event.target.value = '';
      return false;
    }
    let fileReader = new FileReader();
    fileReader.onloadstart = (e) => {
      this.isFileUploading = true;
    };
    fileReader.onloadend = (e) => {
      this.isFileUploading = false;
      this.isFileUploaded = true;
      this.avatar = e.target.result;
      this.uploadedFile = file;
    };
    fileReader.readAsDataURL(file);
  }

  onSubmit(credentials) {
    credentials.AvatarURL = this.avatar;
    this._userService.signup(credentials).subscribe(
      result => {
        if (result.success === true) {
          this._router.navigate(['/login']);
        } else if (result.success === false) {
          this.error = result.message;
        }
      },
      err => this.error = 'Signing up failed'
    );
  }
}
