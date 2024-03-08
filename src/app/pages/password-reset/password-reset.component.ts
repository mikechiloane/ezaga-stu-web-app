import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {NgIf} from "@angular/common";
import {TextfieldComponent} from "../../shared/textfield/textfield.component";
import {AuthServiceService} from "../../service/auth/auth-service.service";
import {Router} from "@angular/router";
import {PATHS} from "../../shared/routes";

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    ButtonComponent,
    NgIf,
    TextfieldComponent
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent implements OnInit {

  error: boolean = false;
  errorMessage: string = '';
  email: string = '';
  password: string;

  constructor(private authService: AuthServiceService, private router: Router) {
  }

  onPasswordValueChange(value: string) {
    this.password = value;
  }

  onResetPassword(event: Event) {
    event.preventDefault();
    console.log(this.password)
    this.authService.resetPassword(this.password).subscribe(
      (response) => {
        if (response.status === 200) {
          this.authService.isLoggedIn = true;
          localStorage.setItem
          this.router.navigate([PATHS.profile])
        }
      }
    )
  }

  ngOnInit() {

    if(localStorage.getItem('Authorization') === null){
      this.router.navigate([PATHS.login])
    }

  }

}
