import {Component, OnInit} from '@angular/core';
import {TextfieldComponent} from "../../shared/textfield/textfield.component";
import {ButtonComponent} from "../../shared/button/button.component";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {TfAuthModalComponent} from "../../shared/tf-auth-modal/tf-auth-modal.component";
import {AsyncPipe, NgIf, NgTemplateOutlet} from "@angular/common";
import {TfAuthModalService} from "../../shared/tf-auth-modal/service/tf-auth-modal.service";
import {Observable} from "rxjs";
import {AuthServiceService} from "../../service/auth/auth-service.service";
import {PATHS} from "../../shared/routes";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        TextfieldComponent,
        ButtonComponent,
        RouterLink,
        RouterLinkActive,
        TfAuthModalComponent,
        NgTemplateOutlet,
        NgIf,
        AsyncPipe
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
    isAuthModalOpen: Observable<boolean> = this.tfAuthModalService.isOpen$;
    email: string = '';
    password: string = '';
    error:boolean = false;
    errorMesssage:string = '';

    constructor(public tfAuthModalService: TfAuthModalService, private authService: AuthServiceService, private router:Router) {
    }

    onLogin(event: Event) {
        event.preventDefault()
        this.verifyLogin()
        this.authService.login(this.email, this.password).subscribe(
            (response) => {
                console.log(response.status)
               if(response.status === 200) {
                   this.authService.isLoggedIn = true;
                   localStorage.setItem("Authorization", "Bearer " + response.body.token);
                   this.router.navigate([PATHS.profile])
               }

            }

        )




    }

    onEmailValueChange(value: string) {
        this.email = value;
    }

    onPasswordValueChange(value: string) {
        this.password = value;
    }

    verifyLogin(){
        if(this.email.length < 1 || this.password.length < 1){
            this.error = true;
            this.errorMesssage = 'Please fill in all fields';
        }else{
            this.error = false;
        }
    }


    ngOnInit() {
    }

}
