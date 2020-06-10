import { Component, OnInit, Output } from '@angular/core';

import {ConfigDto} from '../../config/dto/config.dto'
import { ConfigService } from 'src/app/config/config.service';
import { EventEmitter } from 'protractor';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  // idDomain , idApplication

  activity  =[]

  configs : ConfigDto[] ;



  constructor(private configService : ConfigService ,private route :ActivatedRoute, private router :Router) { }

  ngOnInit() {
     const APPLICATION_ID_VALIDATION_BL: number = 1 ;

    this.configService.getdByAppidUserId(APPLICATION_ID_VALIDATION_BL).subscribe((config) => {
      this.configs = config;
      console.log('ActivityComponent list config' , this.configs);
    });
  }

  onSelectConfig(config : any){
    console.log("onSelectConfig" , config);
    const param = btoa(JSON.stringify(
      {
        appId : config.application.id ,
        name:config.name ,
        domainId :config.domain.id ,
        configId : config.id
      }));
    console.log("param ---- " , param);
    this.router.navigate(['/validation-bl','details'], { relativeTo: this.route , queryParams:{'q' :param}} );
  }

}
