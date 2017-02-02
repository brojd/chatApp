import { Component } from '@angular/core';
import template from './ch-emoji-picker.template.html';
import styles from './ch-emoji-picker.stylesheet.scss';
import emoji from './emojifile';

@Component({
  selector: 'ch-emoji-picker',
  template: template,
  styles: [styles]
})
export class ChEmojiPickerComponent {
  
  constructor() {
    this.icons = emoji;
    debugger;
  }
  
}
