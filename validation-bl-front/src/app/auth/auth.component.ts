import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService , AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  isLoading = false;
  isLoginMode = true ;
  error: string = null;


  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    // if (this.isLoginMode) {
    //   authObs = this.authService.login(username, password);
    // } else {
    //   authObs = this.authService.signup(username, password);
    // }

    authObs = this.authService.login(username, password);

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;

        this.router.navigate(['/']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onLogout(){
    this.authService.logout();
  }

}
