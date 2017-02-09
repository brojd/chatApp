import { Component, Input, ViewChild } from '@angular/core';
import template from './ch-feed.template.html';
import styles from './ch-feed.stylesheet.scss';

@Component({
  selector: 'ch-feed',
  template: template,
  styles: [styles]
})
export class ChFeedComponent {
  
  @Input() feed = [];
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
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  ngOnInit() {
    console.log(this.feed);
  }
  
}
