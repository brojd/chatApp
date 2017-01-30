import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import template from './ch-room.template.html';
import styles from './ch-room.stylesheet.scss';
import { ChMessageService } from '../../services/ch-message.service';

@Component({
  selector: 'ch-room',
  template: template,
  styles: [styles]
})
export class ChRoomComponent {
  
  constructor(route: ActivatedRoute, messageService: ChMessageService) {
    this.route = route;
    this.messageService = messageService;
    this.messages = [];
    this.message = '';
  }
  
  sendMessage(){
    this.messageService.sendMessage(this.message);
    this.message = '';
  }
  
  ngOnInit() {
    this.routeSubscription = this.route
      .params
      .subscribe(params => {
        console.log(params.id);
      });
    this.chatConnection = this.messageService.getMessages().subscribe(message => {
      this.messages.push(message);
    });
    this.listenUserConnected = this.messageService.notifyUserConnected().subscribe(
      () => console.log('user connected'),
      err => {debugger;}
    );
    this.listenUserDisconnected = this.messageService.notifyUserDisconnected().subscribe(
      () => console.log('user disconnected')
    );
  }
  
  ngOnDestroy() {
    this.chatConnection.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.listenUserConnected.unsubscribe();
    this.listenUserDisconnected.unsubscribe();
  }
}
