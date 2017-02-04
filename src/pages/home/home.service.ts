import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class HomeService {

  private baseUrl: string;
  constructor(private http: Http) {
    this.baseUrl = 'https://immense-plateau-38185.herokuapp.com/api?username=';
  }

  getUrl(username){
     return this.http.get(`${this.baseUrl}${username}`)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
  }

  getLanguages() {
    return [65, 59, 80, 81, 56, 55, 40];
  }
}
