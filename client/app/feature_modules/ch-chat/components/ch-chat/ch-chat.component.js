import { Component } from '@angular/core';
import template from './ch-chat.template.html';
import styles from './ch-chat.stylesheet.scss';
import { UserService } from '../../../../auth';

@Component({
  selector: 'ch-chat',
  template: template,
  styles: [styles]
})
export class ChChatComponent {
  
  constructor(userService: UserService) {
    this.userService = userService;
    this.userNickname = userService.getCurrentUserDetails().nickname;
  }
  
}
