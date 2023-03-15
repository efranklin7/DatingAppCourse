import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IUser } from '../_Model/User';

@Injectable({
  //it can be injected
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:7070/api/';

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post<IUser>(this.baseUrl + 'account/login', model).pipe(
      map((response: IUser) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
    );
  }
  logout() {
    localStorage.removeItem('key');
  }
}
