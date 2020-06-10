import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription, iif } from 'rxjs';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{

  isAuthenticated = false;
  isAdmin = false ;

  private userSub: Subscription;

  constructor(
    private router :Router ,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user : User) => {
      this.isAuthenticated = !!user;

      if(user){
        const usr = JSON.parse(atob(user.token.split('.')[1]));
        if(usr && usr.role == 1 ){
          this.isAdmin = true ;
        }
      }

      console.log(" HeaderComponent ngOnInit  !user ==> ",!user);
      console.log(" HeaderComponent ngOnInit  !!user ==> ",!user);
      console.log(!!user);

    });
  }

  onDeconnect(){
    // suprimer le jeton dans le localstorage
    this.authService.logout();
    this.router.navigate(["/auth"]) ;

  }

  onConfig(){
    console.log("page user config") ;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }


}
