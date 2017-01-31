import { Component, Input } from '@angular/core';
import template from './ch-messages-window.template.html';
import styles from './ch-messages-window.stylesheet.scss';

@Component({
  selector: 'ch-messages-window',
  template: template,
  styles: [styles]
})
export class ChMessagesWindowComponent {
  
  @Input() messages = [];
  
  constructor() {
  }
  
}
