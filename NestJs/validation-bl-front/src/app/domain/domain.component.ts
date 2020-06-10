import { Component, OnInit , OnChanges , OnDestroy  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomainDto } from './dto/domain.dto';
import { DomainService } from './domain.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit , OnChanges , OnDestroy   {

  constructor(
    private domainService :DomainService,
    private route :ActivatedRoute) { }

  domains : DomainDto[] ;
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
    this.domainService.getAll().subscribe(d => {
      this.domains = [...d] ;
      console.log( this.domains ) ;
    }) ;
  }

  ngOnDestroy(){
    console.log('-----------ngOnDestroy');
  }

  ngOnChanges(){
    console.log('-----------ngOnChanges');
  }



}
