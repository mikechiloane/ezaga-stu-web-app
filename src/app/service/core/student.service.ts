import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_PATHS} from "../../shared/api-paths";

@Injectable({
  providedIn: 'root'
})
export class StudentService{

  student: {
    fullName: string,
    email: string,
    studentNumber: string,
    secondFactorAuthEnabled: boolean,
    needsPasswordReset: boolean,
  } ;

  constructor(private http: HttpClient) {
  }

  httpHeaders: HttpHeaders = new HttpHeaders().set('Authorization', localStorage.getItem('Authorization') ||'');

  getStudentProfile(email: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(API_PATHS.studentProfile,{email}, {
      headers: this.httpHeaders,
      observe: 'response' // Include this inside the same object
    });
  }

  handleStudentProfileResponse(response: HttpResponse<any>): void {
    if (response.status === 200) {
      this.student = response.body;
    }
  }

}
