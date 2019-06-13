import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private static userId: string;

  apiUrl = 'http://dev.contanimacion.com/birds/public/';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  static isAuthenticated() {
    return this.userId != null && this.userId !== '';
  }

  static getUserId(): string {
    return this.userId;
  }

  static setUserId(id) {
    this.userId = id;
  }

  login(user, password) {
    const params = new HttpParams()
        .set('user', user)
        .set('password', password);

    return this.http.post(this.apiUrl + 'login/', params);
  }

  getBirds() {
    return this.http.get(this.apiUrl + 'getBirds/' + RestService.userId);
  }

  getBirdDetails(birdId) {
    return this.http.get(this.apiUrl + 'getBirdDetails/' + birdId);
  }
}
