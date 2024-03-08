import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TfAuthModalService} from "../tf-auth-modal/service/tf-auth-modal.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {AuthServiceService} from "../../service/auth/auth-service.service";
import {Router} from "@angular/router";
import {PATHS} from "../routes";

@Component({
  selector: 'app-otp-modal',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ],
  templateUrl: './otp-modal.component.html',
  styleUrl: './otp-modal.component.css'
})
export class OtpModalComponent implements OnInit{
  @Input() label: string;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() value: string="";
  @Input() autocomplete: string;
  @Input() email: string = "your email";

  error: boolean = false;
  errorMessage: string = '';
  otp: string = '';
  otpVerified: boolean = false;

  @Output() inputValueChange: EventEmitter<string> = new EventEmitter<string>();


  constructor(public tfAuthModalService: TfAuthModalService, private  authService: AuthServiceService, private router: Router) {
  }

  onInputChanged(event: any) {
    this.otp = event.target.value;
    this.inputValueChange.emit(this.value);
  }

  closeModal() {
    this.tfAuthModalService.closeModal();
  }

  onOtpVerify(event: Event) {
    event.preventDefault();
    if(!this.error){
      this.authService.verifyOtp(this.email, this.otp).subscribe(
        (response) => {
          if (response.status === 200) {
            this.otpVerified = true;
            this.tfAuthModalService.closeModal();
            localStorage.setItem('Authorization', 'Bearer ' + response.body.token);
            this.router.navigate([PATHS.passwordReset]);
          }
        }
      )

      if(this.otpVerified){
        this.tfAuthModalService.closeModal();
      }
      else {
        this.error = true;
        this.errorMessage = 'Invalid OTP';
      }
    }
  }

  ngOnInit() {
  }
}
