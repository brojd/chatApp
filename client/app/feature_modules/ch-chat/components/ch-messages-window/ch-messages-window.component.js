import { Component, Input, ViewChild } from '@angular/core';
import template from './ch-messages-window.template.html';
import styles from './ch-messages-window.stylesheet.scss';

@Component({
  selector: 'ch-messages-window',
  template: template,
  styles: [styles]
})
export class ChMessagesWindowComponent {
  
  @Input() messages = [];
  @ViewChild('scrollMeDown') messagesWindow;
  
  constructor() {}
  
  scrollToBottom() {
    try {
      this.messagesWindow.nativeElement.scrollTop = this.messagesWindow.nativeElement.scrollHeight;
    } catch(err) { }
  }
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
}
