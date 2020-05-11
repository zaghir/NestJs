import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router :Router) { }

  ngOnInit() {
  }

  onDeconnect(){
    // suprimer le jeton dans le localstorage
    this.router.navigate(["/auth"]) ;
  }

  onConfig(){
    console.log("page user config") ;
  }


}
