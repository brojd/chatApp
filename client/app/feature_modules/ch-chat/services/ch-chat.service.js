import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../../config';
import { UserService } from '../../../auth/services/user/user.service';
import { ChRoomService } from './ch-room.service';

@Injectable()
export class ChChatService {
  
  constructor(http: Http, userService: UserService, roomService: ChRoomService) {
    this._http = http;
    this.userService = userService;
    this.roomService = roomService;
  }
  
  sendMessage(message){
    this.socket.emit('add-message', message);
  }
  
  connectToChat(roomId) {
    let userNickname = this.userService.getCurrentUserDetails().nickname;
    let observable = new Observable(observer => {
      this.socket = io(API_URL, {query: `roomId=${roomId}&nickname=${userNickname}`});
      this.socket.on('connect', () => {
        this.roomService.getRoom(roomId).subscribe(
          room => {
            observer.next(room);
          },
          err => console.log(err)
        )
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  
  listenNewMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (message) => {
        observer.next(message);
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
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  
  notifyUserDisconnected() {
    let observable = new Observable(observer => {
      this.socket.on('user-disconnected', (data) => {
        console.log('discon');
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  
}