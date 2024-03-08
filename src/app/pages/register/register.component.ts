import { Component } from '@angular/core';
import {TextfieldComponent} from "../../shared/textfield/textfield.component";
import {ButtonComponent} from "../../shared/button/button.component";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthServiceService} from "../../service/auth/auth-service.service";
import {NgIf} from "@angular/common";
import {PATHS} from "../../shared/routes";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    TextfieldComponent,
    ButtonComponent,
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  email:string = '';
  password:string = '';
  fullName:string = '';
  error:boolean = false;
  errorMesssage:string = '';

  verifyRegister(){
    if(this.email.length < 1 || this.password.length < 1 || this.fullName.length < 1){
      this.error = true;
      this.errorMesssage = 'Please fill in all fields';
    }else{
      this.error = false;
    }
  }

  onEmailValueChange(value: string){
    this.email = value;
  }

  onPasswordValueChange(value: string){
    this.password = value;
  }

  onFullNameValueChange(value: string){
    this.fullName = value;
  }

  constructor(private authService: AuthServiceService, private router: Router) {
  }


  onRegister(event:Event){
    event.preventDefault();
    this.verifyRegister();
    if(this.error) return;
    this.authService.register(this.email, this.password, this.fullName).subscribe(
      (response) => {
        if(response.status === 200){
          this.authService.isLoggedIn= true;
          localStorage.setItem("Authorization", "Bearer "+response.body.token);
          this.router.navigate([PATHS.profile])
        }
      }
    )
  }

}
