import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import template from './ch-room.template.html';
import styles from './ch-room.stylesheet.scss';
import { ChChatService } from '../../services/ch-chat.service';
import { UserService } from '../../../../auth/services/user/user.service';

@Component({
  selector: 'ch-room',
  template: template,
  styles: [styles]
})
export class ChRoomComponent {
  
  constructor(route: ActivatedRoute, chatService: ChChatService, userService: UserService) {
    this.route = route;
    this.chatService = chatService;
    this.messages = [];
    this.messageText = '';
    this.userService = userService;
    this.userNickname = userService.getCurrentUserDetails().nickname;
  }
  
  sendMessage(){
    let message = {
      nickname: this.userNickname,
      date: new Date(),
      text: this.messageText,
      roomId: this.roomId
    };
    this.chatService.sendMessage(message);
    this.messageText = '';
  }
  
  ngOnInit() {
    this.routeSubscription = this.route
      .params
      .subscribe(params => {
        this.roomId = params.id;
        this.listenMessages = this.chatService.getMessages(params.id).subscribe(message => {
          this.messages.push(message);
        });
      });
    this.listenUserConnected = this.chatService.notifyUserConnected().subscribe(
      () => console.log('user connected')
    );
    this.listenUserDisconnected = this.chatService.notifyUserDisconnected().subscribe(
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
