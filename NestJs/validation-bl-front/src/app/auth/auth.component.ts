import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { AuthService , AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { DomainService } from '../domain/domain.service';
import { DomainDto } from '../domain/dto/domain.dto';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private domainService : DomainService,
    private router: Router) {}

  isLoading = false;
  isLoginMode = true ;
  error: string = "";
  isSingnupMode = false ;

  domains : DomainDto[];
  domainsControl :FormControl ;

  ngOnInit() {
    this.domainService.getAll().subscribe((ds) => {
      this.domains = ds ;
      console.log('list domain ' , this.domains) ;
    });
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
        this.error = "";
        console.log("------------",errorMessage);
        errorMessage.error.message.forEach(er => {
          this.error += this.error + er+ '\n';
        });
        this.isLoading = false;
      }
    );

    form.reset();
  }

  switchSigninSingnUp(){
    this.isSingnupMode = ! this.isSingnupMode ;
  }

  onSubmitSignup(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const username = form.value.username;
    const surname = form.value.surname;
    const lastname = form.value.lastname;
    const email = form.value.email ;
    const password = form.value.password;

    const dns = form.controls['domainsController'].value;
    console.log("form--------------------" , form);
    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    authObs = this.authService.signup(username , surname , lastname , email , password  , dns);

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/auth']);
        this.isSingnupMode = false;
      },
      errorMessage => {
        this.error = "";
        this.isLoading = false;
        console.log('-------------------',errorMessage);
        errorMessage.error.message.forEach(er => {
          this.error += this.error + er+ '\n';
        });
      }
    );
    form.reset();
  }

  onLogout(){
    this.authService.logout();
  }

  onDomainChange(domain){
    console.log('onDomainChange ' , domain );
  }

}
