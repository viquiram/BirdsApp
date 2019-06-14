import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  apiUrl = 'http://dev.contanimacion.com/birds/public/';

  constructor(public http: HttpClient) { }

  static isAuthenticated(): boolean {
    const userId = store.get('userId');
    return userId != null && userId !== '';
  }

  static setUserId(id) {
    store.set('userId', id);
  }

  static deleteUserId() {
    store.remove('userId');
  }

  login(user, password) {
    const params = new HttpParams()
        .set('user', user)
        .set('password', password);

    return this.http.post(this.apiUrl + 'login/', params);
  }

  getBirds() {
    return this.http.get(this.apiUrl + 'getBirds/' + store.get('userId'));
  }

  getBirdDetails(birdId) {
    return this.http.get(this.apiUrl + 'getBirdDetails/' + birdId);
  }

  addSighting(birdId, place, long, lat) {
    const params = new HttpParams()
        .set('idAve', birdId)
        .set('place', place)
        .set('long', long)
        .set('lat', lat);

    return this.http.post(this.apiUrl + 'addSighting/', params);
  }
}
