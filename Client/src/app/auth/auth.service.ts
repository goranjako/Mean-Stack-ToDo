import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sweetalert2Service } from 'src/app/shared/swal.service';
import * as jwt_decode from 'jwt-decode';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userid;
  constructor(private http: HttpClient, private toast: Sweetalert2Service) { }

  register(user): Observable<User> {
    return this.http.post<User>('http://localhost:3000/register', user);
  }


  login(authCredentials) {
    return this.http.post<any>('http://localhost:3000/login', authCredentials)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('jwt', JSON.stringify(user));
        }
        return user;
      }));
  }

  Guser(id): Observable<any> {
    return this.http.get<any>('http://localhost:3000/todo/' + id)
      .pipe(
        retry(1),
        catchError(this.errorHandl)
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('jwt');
    this.toast.show('warning', 'Logaut');
  }


  getToken() {
    const token = localStorage.getItem('jwt');
    const decode = jwt_decode(token);
    return decode;

  }
  public isLoggedIn() {
    return localStorage.getItem('jwt') !== null;

  }

  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
