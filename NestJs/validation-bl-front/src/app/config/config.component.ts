import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from './config.service';
import { ConfigDto } from './dto/config.dto';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(
    private configService :ConfigService,
    private route :ActivatedRoute) { }

  configs : ConfigDto[] ;

  ngOnInit(): void {

    console.log('-----------ngOnInit');

    this.loadData();

    this.route.queryParams.subscribe((params )=> {
      console.log(params);
      if(params["action"] && params["action"] == 'reload'){
        this.loadData();
      }

    });
  }

  loadData(){
    this.configService.getAll().subscribe(c => {
      this.configs = [...c] ;
      console.log( this.configs ) ;
    }) ;
  }

}
