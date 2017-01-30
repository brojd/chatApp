import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../../../config';

@Injectable()
export class ChMessageService {
  
  constructor(http: Http) {
    this._http = http;
  }
  
  sendMessage(message){
    this.socket.emit('add-message', message);
  }
  
  getMessages() {
    let observable = new Observable(observer => {
      this.socket = io(API_URL);
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
  
}
