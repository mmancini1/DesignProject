import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { BeerListComponent } from './components/beer-list/beer-list.component';
import { NotifyRequestComponent } from './components/notify-request/notify-request.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuardService } from './service/auth-guard.service';

// canActivate: [AuthGuardService] 
const routes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'beerlist', outlet:'subRoute' , component: BeerListComponent, },
  { path: 'notify', outlet:'subRoute' , component: NotifyRequestComponent, },
  { path: 'signup', component: SignupComponent, },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
