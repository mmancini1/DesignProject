import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { BeerListComponent } from './components/beer-list/beer-list.component';
import { NotifyRequestComponent } from './components/notify-request/notify-request.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


const routes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, },
  { path: 'beerlist', outlet:'subRoute' , component: BeerListComponent },
  { path: 'notify', outlet:'subRoute' , component: NotifyRequestComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
