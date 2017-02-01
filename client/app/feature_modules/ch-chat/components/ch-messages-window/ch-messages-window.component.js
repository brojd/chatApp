import { Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import template from './ch-messages-window.template.html';
import styles from './ch-messages-window.stylesheet.scss';

@Component({
  selector: 'ch-messages-window',
  template: template,
  styles: [styles]
})
export class ChMessagesWindowComponent {
  
  @Input() messages = [];
  @Output() onDownloadClicked = new EventEmitter();
  @ViewChild('scrollMeDown') messagesWindow;
  
  constructor() {}
  
  scrollToBottom() {
    try {
      this.messagesWindow.nativeElement.scrollTop = this.messagesWindow.nativeElement.scrollHeight;
    } catch(err) { }
  }
  
  areDatesTheSame (date1, date2) {
    let dateA = new Date(date1);
    let dateB = new Date(date2);
    return dateA.toDateString() === dateB.toDateString();
  }
  
  downloadFileClicked(name) {
    this.onDownloadClicked.emit(name);
  }
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
}
