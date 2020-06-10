import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../application.service';
import { ApplicationDto } from '../dto/application.dto';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.css']
})
export class EditApplicationComponent implements OnInit {


  constructor(
    private route :ActivatedRoute ,
    private applicationService : ApplicationService,
    private router :Router
  ) { }

  action: string;

  application : ApplicationDto;

  applicationForm: FormGroup;

  error :string ;

  ngOnInit(): void {
    this.applicationForm = new FormGroup({
      "id": new FormControl(null, Validators.required),
      "name": new FormControl(null, Validators.required),
      "description": new FormControl(null, [Validators.required]),
    });

    this.route.queryParams.subscribe((params )=> {
      console.log(params);
      this.action = params["action"] ;
      if(this.action == "edit"){
        this.applicationService.getById(params["id"]).subscribe((app :ApplicationDto)=>{
          this.application = app ;
          console.log(this.application);

          // this.applicationForm.controls["description"].value(this.application.description)  ;
          // this.applicationForm.controls["name"].value(this.application.name)  ;
          console.log("application" , app);
          this.applicationForm.patchValue({
            'name': this.application.name,
            'description': this.application.description
          });
        });
      }
    });

  }

  onSubmit(){
    console.log(this.applicationForm);
    if ( this.action == "edit" && this.application.id){
      this.application.description =  this.applicationForm.controls["description"].value ;
      this.application.name = this.applicationForm.controls["name"].value ;

      this.applicationService.update(this.application).subscribe((app: ApplicationDto) => {
        console.log(" ")
      } ,(error) => {
        this.error = error ;
        console.log("udpate error" , error) ;
      });
    }else if(this.action == "add"){
      this.application = new ApplicationDto();
      this.application.id =  this.applicationForm.controls["id"].value ;
      this.application.description =  this.applicationForm.controls["description"].value ;
      this.application.name = this.applicationForm.controls["name"].value ;
      this.applicationService.add(this.application).subscribe((app: ApplicationDto) => {
        console.log(" add ")
      } ,(error) => {
        this.error = error ;
        console.log("udpate error" , error) ;
      });
    }

    this.router.navigate(['../'], { relativeTo: this.route , queryParams:{'action' :'reload'}} );
  }

}
