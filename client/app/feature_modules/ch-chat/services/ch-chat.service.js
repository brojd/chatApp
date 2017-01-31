import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../../config';
import { UserService } from '../../../auth/services/user/user.service';

@Injectable()
export class ChChatService {
  
  constructor(http: Http, userService: UserService) {
    this._http = http;
    this.userService = userService;
  }
  
  sendMessage(message){
    this.socket.emit('add-message', message);
  }
  
  connectToChat(roomId) {
    let userNickname = this.userService.getCurrentUserDetails().nickname;
    let observable = new Observable(observer => {
      this.socket = io(API_URL, {query: `roomId=${roomId}&nickname=${userNickname}`});
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  
  notifyUserConnected() {
    let observable = new Observable(observer => {
      this.socket.on('user-connected', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
  
  notifyUserDisconnected() {
    let observable = new Observable(observer => {
      this.socket.on('user-disconnected', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
  
}
