import { Component, OnInit } from '@angular/core';
import { ConfigDto } from '../dto/config.dto';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../config.service';
import { DomainService } from 'src/app/domain/domain.service';
import { DomainDto } from 'src/app/domain/dto/domain.dto';
import { ApplicationService } from 'src/app/application/application.service';
import { ApplicationDto } from 'src/app/application/dto/application.dto';

@Component({
  selector: 'app-edit-config',
  templateUrl: './edit-config.component.html',
  styleUrls: ['./edit-config.component.css']
})
export class EditConfigComponent implements OnInit {

  constructor(
    private route :ActivatedRoute ,
    private router :Router,
    private configService : ConfigService,
    private domainService : DomainService,
    private applicationService : ApplicationService,

  ) { }

  action: string;

  config : ConfigDto;

  configForm: FormGroup;

  error :string ;
  errorJson :boolean ;

  domains :DomainDto[];

  applications :ApplicationDto[];

  ngOnInit(): void {
    this.configForm = new FormGroup({
      "id": new FormControl(null, Validators.required),
      "name": new FormControl(null, Validators.required),
      "value": new FormControl(null, Validators.required),
      "description": new FormControl(null, [Validators.required]),
      'domain': new FormControl(null, [Validators.required]),
      'application': new FormControl(null, [Validators.required])
    });

    this.domainService.getAll().subscribe((ds) => {
      this.domains = ds ;
      console.log('list domain ' , this.domains) ;
    });

    this.applicationService.getAll().subscribe((apps) => {
      this.applications = apps ;
      console.log('list application ' , this.applications) ;
    });


    this.route.queryParams.subscribe((params )=> {
      console.log(params);
      this.action = params["action"] ;
      if(this.action == "edit"){
        this.configService.getById(params["id"]).subscribe((config :ConfigDto)=>{
          this.config = config[0] ;
          console.log(this.configForm);

          console.log("config" , config);

          this.configForm.patchValue({
            'id': this.config.id ,
            'name': this.config.name ,
            'description': this.config.description ,
            'value': this.config.value ,
            'domain': this.config.domain.id ,
            'application': this.config.application.id
          });

        });
      }

    });

  }

  onSubmit(){
    console.log(this.configForm);
    if ( this.action == "edit" && this.config.id){

      this.config.name =  this.configForm.controls["name"].value ;
      this.config.description =  this.configForm.controls["description"].value ;
      this.config.value = this.configForm.controls["value"].value ;
      this.config.domain.id = +this.configForm.controls["domain"].value ;
      this.config.application.id = +this.configForm.controls["application"].value ;

      this.configService.update(this.config).subscribe((config : ConfigDto) => {
        console.log(" condig is added " , config)
      } ,(error) => {
        this.error = error ;
        console.log("udpate error" , error) ;
      });
    }else if(this.action == "add"){
      this.config = new ConfigDto();
      console.log("Id --- " , this.configForm.controls["id"].value) ;
      this.config.id =  this.configForm.controls["id"].value ;
      this.config.name =  this.configForm.controls["name"].value ;
      this.config.description =  this.configForm.controls["description"].value ;
      this.config.value = this.configForm.controls["value"].value ;
      const domain : DomainDto = new DomainDto() ;
      domain.id =  +this.configForm.controls["domain"].value
      this.config.domain = domain  ;
      const app: ApplicationDto = new ApplicationDto();
      app.id = +this.configForm.controls["application"].value
      this.config.application =  app ;
      console.log(" add ---------" , this.config);
      this.configService.add(this.config).subscribe((domain: ConfigDto) => {
        console.log(" add " , this.config);
      } ,(error) => {
        this.error = error ;
        console.log("add error" , error) ;
      });
    }
    this.configForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route , queryParams:{'action' :'reload'}} );
  }

  onDomainChange(){
    console.log("onDomainChange");
  }

  onApplicationChange(){
    console.log("onApplicationChange");
  }

  valueChange(event ){
    if(this.configForm.controls["value"].value.length > 0){
      try{
        const obj = JSON.parse(this.configForm.controls["value"].value);
        const pretty = JSON.stringify(obj, undefined, 4);
        this.config.value = pretty ;

        this.configForm.patchValue({
          'value': this.config.value ,
        });
        console.log("-parcing ok -" , this.config.value) ;
        this.errorJson= false ;
      }catch(error ){
        console.log("-error de parcing Json-") ;
        this.errorJson = true;
      }
    }

  }

}
