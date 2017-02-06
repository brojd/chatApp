import { Component, Output, EventEmitter, Input } from '@angular/core';
import template from './ch-emoji-picker.template.html';
import styles from './ch-emoji-picker.stylesheet.scss';
import emoji from './emojifile';

@Component({
  selector: 'ch-emoji-picker',
  template: template,
  styles: [styles]
})
export class ChEmojiPickerComponent {
  
  @Output() onIconClick = new EventEmitter();
  @Input() bottom = '40px';
  @Input() right = '5px';
  
  constructor() {
    this.icons = emoji;
    this.iconKeys = Object.keys(emoji);
  }
  
  handleIconClick(icon) {
    this.onIconClick.emit(icon);
  }
  
}
