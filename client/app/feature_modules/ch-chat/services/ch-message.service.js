import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { API_URL } from '../../../../config';

@Injectable()
export class ChMessageService {
  
  constructor(http: Http) {
    this._http = http;
  }
  
}
