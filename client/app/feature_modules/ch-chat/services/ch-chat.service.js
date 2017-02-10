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
    const userId = this.userService.getCurrentUserDetails().userId;
    const nickname = this.userService.getCurrentUserDetails().nickname;
    let observable = new Observable(observer => {
      this.socket = io(API_URL, {query: `roomId=${roomId}&userId=${userId}&nickname=${nickname}`});
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
  
  uploadFileToServer(file, fileData) {
    let observable = new Observable(observer => {
      let fileUploadedHandled = false;
      let objToSend = {
        name: file.name,
        size: file.size,
        type: file.type,
        fileData: fileData
      };
      this.socket.emit('fileUpload', objToSend);
      this.socket.on('fileUploadFinish', (data) => {
        if (!fileUploadedHandled) {
          observer.next(data);
        }
        fileUploadedHandled = true;
      });
    });
    return observable;
  }
  
  downloadFile(name, date) {
    let fileInfo = {
      name: name,
      date: date
    };
    this.socket.emit('fileDownload', fileInfo);
    let observable = new Observable(observer => {
      this.socket.on('fileDownloadFinish', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
  
}
