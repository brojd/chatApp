import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import template from './ch-room.template.html';
import styles from './ch-room.stylesheet.scss';
import { ChMessageService } from '../../services/ch-message.service';
import { UserService } from '../../../../auth/services/user/user.service';

@Component({
  selector: 'ch-room',
  template: template,
  styles: [styles]
})
export class ChRoomComponent {
  
  constructor(route: ActivatedRoute, messageService: ChMessageService, userService: UserService) {
    this.route = route;
    this.messageService = messageService;
    this.messages = [];
    this.messageText = '';
    this.userService = userService;
    this.userNickname = userService.getCurrentUserDetails().nickname;
  }
  
  sendMessage(){
    let message = {
      nickname: this.userNickname,
      date: new Date(),
      text: this.messageText
    };
    this.messageService.sendMessage(message);
    this.messageText = '';
  }
  
  ngOnInit() {
    this.routeSubscription = this.route
      .params
      .subscribe(params => {
        console.log(params.id);
      });
    this.listenMessages = this.messageService.getMessages().subscribe(message => {
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
    this.listenMessages.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.listenUserConnected.unsubscribe();
    this.listenUserDisconnected.unsubscribe();
  }
}
