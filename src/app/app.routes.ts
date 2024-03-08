import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ForgotPasswordComponent} from "./pages/forgot-password/forgot-password.component";
import {StudentProfileComponent} from "./pages/student-profile/student-profile.component";
import {PasswordResetComponent} from "./pages/password-reset/password-reset.component";
export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },

  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'student-profile', component: StudentProfileComponent
  },
  {
    path: 'password-reset', component: PasswordResetComponent
  }
];

