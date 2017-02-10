import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { API_URL } from '../../../../config';

@Injectable()
export class ChRoomService {
  
  constructor(http: Http) {
    this._http = http;
  }
  
  getRooms() {
    return this._http
      .get(`${API_URL}/rooms`)
      .map(res => res.json());
  }
  
  getRoom(id) {
    return this._http
      .get(`${API_URL}/rooms/${id}`)
      .map(res => res.json());
  }
  
  createRoom(room) {
    return this._http
      .post(`${API_URL}/rooms`, room)
      .map(res => res.json());
  }
  
  deleteRoom(id) {
    return this._http
      .delete(`${API_URL}/rooms/${id}`)
      .map(res => res.json());
  }
  
}
