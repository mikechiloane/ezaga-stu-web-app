import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {TextfieldComponent} from "../../shared/textfield/textfield.component";
import {StudentService} from "../../service/core/student.service";
import {Router} from "@angular/router";
import {AuthServiceService} from "../../service/auth/auth-service.service";
import {API_PATHS} from "../../shared/api-paths";
import {PATHS} from "../../shared/routes";

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [
    ButtonComponent,
    TextfieldComponent
  ],
  templateUrl: './student-profile.component.html',
  styleUrl: './student-profile.component.css'
})
export class StudentProfileComponent implements OnInit {
  student: {
    fullName: string,
    email: string,
    studentNumber: string,
    secondFactorAuthEnabled: boolean,
    needsPasswordReset: boolean,
  } ;

  constructor(private studentService: StudentService, private authService:AuthServiceService, private router: Router) {
  }

  setStudentProfile() {
    this.student = this.studentService.student;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate([PATHS.login])
  }

  ngOnInit(): void {
    if(!this.authService.verifySession()){
      console.log('not logged in')
      this.router.navigate([PATHS.login])
    }

    this.studentService.getStudentProfile(this.authService.getStudentEmail()).subscribe(
      (response) => {
        if (response.status === 200) {
          this.studentService.handleStudentProfileResponse(response);
          this.setStudentProfile()
        }

       else {
          this.router.navigate([PATHS.login])
        }
      }
    )
  }
}
