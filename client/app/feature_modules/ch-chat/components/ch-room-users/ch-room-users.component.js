import { Component, Input } from '@angular/core';
import template from './ch-room-users.template.html';
import styles from './ch-room-users.stylesheet.scss';

@Component({
  selector: 'ch-room-users',
  template: template,
  styles: [styles]
})
export class ChRoomUsersComponent {
  
  @Input() connectedUsers = [];
  
  constructor() {}
  
}
