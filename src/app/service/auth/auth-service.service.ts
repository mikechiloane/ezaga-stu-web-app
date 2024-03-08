import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import { API_PATHS } from "../../shared/api-paths";
import { Observable } from "rxjs";
import {Router} from "@angular/router";
import {PATHS} from "../../shared/routes";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient, private router: Router) { }
  isLoggedIn: boolean = false;

  httpHeaders: HttpHeaders = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization') ||'');



  login(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(API_PATHS.login, { email, password }, { observe: 'response' });
  }

  register(email: string, password: string, fullName: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(API_PATHS.register, { email, password, fullName }, { observe: 'response' });
  }

  getStudentProfile(email: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(API_PATHS.studentProfile,{email}, {
      observe: 'response',
      headers: this.httpHeaders
    });
  }

  handleLoginResponse(response: HttpResponse<any>): void {
    if (response.status === 200) {
      this.isLoggedIn = true;
    }
  }

  getStudentEmail():string{
    return JSON.parse(atob(localStorage.getItem('Authorization')?.split('.')[1] || '')).sub;
  }

  getOtp(email: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(API_PATHS.getOtp, { email }, { observe: 'response' });
  }

  verifyOtp(email: string, otp: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(API_PATHS.verifyOtp, { email, otp }, { observe: 'response' });
  }

  resetPassword(password: string): Observable<HttpResponse<any>> {

    return this.http.post<HttpResponse<any>>(API_PATHS.resetPassword, { token:this.getAuthToken(), password }, { observe: 'response' ,
    headers: this.httpHeaders});
  }

  getAuthToken():string{
    return localStorage.getItem('Authorization')?.substring(7) || '';
  }

  verifySession():boolean{
    if(localStorage.getItem('Authorization')){
      this.isLoggedIn = true;
      return true;
    }
    else{
      this.isLoggedIn = false;
      return false;
    }
  }



  logout(){
    this.isLoggedIn = false;
    localStorage.removeItem('Authorization');
    this.router.navigate([API_PATHS.login])
  }


}
