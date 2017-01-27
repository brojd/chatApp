import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { API_URL } from '../../../../config';

@Injectable()
export class ChRoomService {
  
  constructor(http: Http) {
    this._http = http;
  }
  
  createRoom(room) {
    return this._http
      .post(`${API_URL}/room`, room)
      .map(res => res.json());
  }
  
}
