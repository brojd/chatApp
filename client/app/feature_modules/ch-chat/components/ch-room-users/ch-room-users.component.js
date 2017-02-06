import { Component } from '@angular/core';
import template from './ch-room-users.template.html';
import styles from './ch-room-users.stylesheet.scss';
import { UserService } from '../../../../auth/services/user/user.service';

@Component({
  selector: 'ch-room-users',
  template: template,
  styles: [styles]
})
export class ChRoomUsersComponent {
  
  constructor(userService: UserService) {
    this.userService = userService;
  }
  
}
