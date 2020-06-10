import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params , Router} from '@angular/router';

import {DomainService} from '../domain.service';
import { DomainDto } from '../dto/domain.dto';

@Component({
  selector: 'app-edit-domain',
  templateUrl: './edit-domain.component.html',
  styleUrls: ['./edit-domain.component.css']
})
export class EditDomainComponent implements OnInit {

  constructor(
    private route :ActivatedRoute ,
    private domainService : DomainService,
    private router :Router
  ) { }

  action: string;

  domain : DomainDto;

  domainForm: FormGroup;

  error :string ;

  ngOnInit(): void {
    this.domainForm = new FormGroup({
      "id": new FormControl(null, Validators.required),
      "name": new FormControl(null, Validators.required),
      "description": new FormControl(null, [Validators.required]),
    });

    // let id = this.route.snapshot.params["id"];

    // this.route.params.subscribe( (params: Params) => {
    //   id = params["id"];
    //   console.log("Id domain " , id ) ;
    // });

    this.route.queryParams.subscribe((params )=> {
      console.log(params);
      this.action = params["action"] ;
      if(this.action == "edit"){
        this.domainService.getById(params["id"]).subscribe((domain :DomainDto)=>{
          this.domain = domain ;
          console.log(this.domainForm);

          // this.domainForm.controls["description"].value(this.domain.description)  ;
          // this.domainForm.controls["name"].value(this.domain.name)  ;
          console.log("domain" , domain);
          this.domainForm.patchValue({
            'description': this.domain.description
          });

          this.domainForm.patchValue({
            'name': this.domain.name
          });

        });
      }

    });

  }

  onSubmit(){
    console.log(this.domainForm);
    if ( this.action == "edit" && this.domain.id){
      this.domain.description =  this.domainForm.controls["description"].value ;
      this.domain.name = this.domainForm.controls["name"].value ;

      this.domainService.updateDomain(this.domain).subscribe((domain: DomainDto) => {
        console.log(" ")
      } ,(error) => {
        this.error = error ;
        console.log("udpate error" , error) ;
      });
    }else if(this.action == "add"){
      this.domain = new DomainDto();
      this.domain.id =  this.domainForm.controls["id"].value ;
      this.domain.description =  this.domainForm.controls["description"].value ;
      this.domain.name = this.domainForm.controls["name"].value ;
      this.domainService.addDomain(this.domain).subscribe((domain: DomainDto) => {
        console.log(" add ")
      } ,(error) => {
        this.error = error ;
        console.log("udpate error" , error) ;
      });
    }

    this.router.navigate(['../'], { relativeTo: this.route , queryParams:{'action' :'reload'}} );
  }


}
