import { Component } from '@angular/core';
import {ButtonComponent} from "../../shared/button/button.component";
import {TextfieldComponent} from "../../shared/textfield/textfield.component";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {PATHS} from "../../shared/routes";
import {AsyncPipe, NgIf} from "@angular/common";
import {TfAuthModalComponent} from "../../shared/tf-auth-modal/tf-auth-modal.component";
import {TfAuthModalService} from "../../shared/tf-auth-modal/service/tf-auth-modal.service";
import {OtpModalComponent} from "../../shared/otp-modal/otp-modal.component";
import {AuthServiceService} from "../../service/auth/auth-service.service";

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ButtonComponent,
    TextfieldComponent,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    NgIf,
    TfAuthModalComponent,
    OtpModalComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  constructor(private router: Router, public tfAuthModalService: TfAuthModalService, private authService: AuthServiceService) {
  }

  email: string = '';
  error: boolean = false;
  errorMessage: string = '';
  otpSent: boolean = false;

  onEmailValueChange(value: string) {
    this.email = value;
  }

  verifyEmail() {
    if (this.email === '') {
      this.error = true;
      this.errorMessage = 'Please enter your email';
    } else {
      this.error = false;
      this.errorMessage = '';
    }
  }


  onOtpRequest(event: Event) {
    this.verifyEmail();
    event.preventDefault();
    if (!this.error) {
      this.authService.getOtp(this.email).subscribe(
        (response) => {
          if (response.status === 200) {
            this.otpSent = true;
            this.tfAuthModalService.openModal();
          }

        }
      )

      if(!this.otpSent){
        this.error = true;
        this.errorMessage = 'Invalid email';
      }


    }


  }
}
