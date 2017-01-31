import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import template from './ch-room.template.html';
import styles from './ch-room.stylesheet.scss';
import { ChChatService } from '../../services/ch-chat.service';
import { ChRoomService } from '../../services/ch-room.service';
import { UserService } from '../../../../auth/services/user/user.service';

@Component({
  selector: 'ch-room',
  template: template,
  styles: [styles]
})
export class ChRoomComponent {
  
  constructor(route: ActivatedRoute, chatService: ChChatService, userService: UserService, roomService: ChRoomService) {
    this.route = route;
    this.chatService = chatService;
    this.roomService = roomService;
    this.messages = [];
    this.messageText = '';
    this.userService = userService;
    this.userNickname = userService.getCurrentUserDetails().nickname;
    this.feed = [];
    this.roomName = '';
  }
  
  sendMessage(){
    let message = {
      nickname: this.userNickname,
      date: new Date(),
      text: this.messageText
    };
    this.chatService.sendMessage(message);
    this.messageText = '';
  }
  
  ngOnInit() {
    this.routeSubscription = this.route
      .params
      .subscribe(params => {
        this.roomId = params.id;
        this.connectToChat = this.chatService.connectToChat(params.id).subscribe(room => {
          this.roomName = room.name;
          this.feed = room.feed;
          this.messages = room.messages;
        });
      });
    this.listenMessages = this.chatService.listenNewMessages().subscribe(
      message => this.messages.push(message)
    );
    this.listenUserConnected = this.chatService.notifyUserConnected().subscribe(
      (data) => this.feed = data.feed.slice()
    );
    this.listenUserDisconnected = this.chatService.notifyUserDisconnected().subscribe(
      (data) => this.feed = data.feed.slice()
    );
  }
  
  ngOnDestroy() {
    this.connectToChat.unsubscribe();
    this.listenMessages.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.listenUserConnected.unsubscribe();
    this.listenUserDisconnected.unsubscribe();
  }
}
