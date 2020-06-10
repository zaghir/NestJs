import { Component, OnInit, ElementRef, Input } from "@angular/core";
import { BlService } from "../bl.service";
import { Document } from "../dto/document.dto";
import { NgForm } from '@angular/forms';
import { ConfigDto } from 'src/app/config/dto/config.dto';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: "app-details-bl",
  templateUrl: "./details-bl.component.html",
  styleUrls: ["./details-bl.component.css"],
})
export class DetailsBlComponent implements OnInit {
  constructor(
    private blService: BlService,
    private route :ActivatedRoute) {}


  isFetching = false;

  showAllDocument = true;

  documents: Document[];

  config :ConfigDto ;

  error :any ;

  ngOnInit() {
    // this.route.queryParams.subscribe( (params: Params) => {
    //   console.log("param ----------- ",params) ;
    //   if(params['q']) {

    //     const cfg = JSON.parse(atob(params['q']));
    //     this.config.id = cfg.id ;

    //   }

    // });

    this.isFetching = true;

    const cfg  = this.route.snapshot.queryParams['q'] ? JSON.parse(atob(this.route.snapshot.queryParams['q'])) : null ;
    console.log("cfg ----  " , cfg) ;
    if(cfg){
      this.config = new ConfigDto();
      this.config.id = cfg.configId;
      this.config.name = cfg.name;
      this.blService.getDocuments(this.config.name).subscribe(
        (documents) => {
          console.log(documents);

          this.documents = [...documents] ;
          this.isFetching = false;

        },
        (error) => {
          this.isFetching = false;
          this.error = error.error ;
          console.log("probleme de recuperation a cause de ", error);
        }
      );
    }else{
      this.isFetching = false;
    }
  }

  submitFrom(form : NgForm){
    if(!form.invalid){
      for(let i = 0 ; i < this.documents.length ; i++) {
        if(form.controls["documents["+i+"].isChecked"] && form.controls["documents["+i+"].isChecked"].value === true ){

          const docSave = new Document() ;
          docSave.docMemo   = form.controls["documents["+i+"].docMemo"] ? form.controls["documents["+i+"].docMemo"].value : null ;
          docSave.docMtTtc  = form.controls["documents["+i+"].docMtTtc"] ? form.controls["documents["+i+"].docMtTtc"].value : null ;
          docSave.docNumero = form.controls["documents["+i+"].docNumero"] ? form.controls["documents["+i+"].docNumero"].value : null ;
          docSave.docPiece = form.controls["documents["+i+"].docPiece"] ? form.controls["documents["+i+"].docPiece"].value : null ;
          docSave.docStype = form.controls["documents["+i+"].docStype"] ? form.controls["documents["+i+"].docStype"].value : null ;
          docSave.pcfCode = form.controls["documents["+i+"].pcfCode"] ? form.controls["documents["+i+"].pcfCode"].value : null ;
          docSave.status = form.controls["documents["+i+"].status"] ? form.controls["documents["+i+"].status"].value : null ;
          console.log("docSave ==> ",docSave);
          this.blService.saveDocument(docSave ,this.config.name) ;
        }

      }
    }
  }

  onUpdateDocument(document){
    console.log('document' , document);
  }
  onSelectAll(form : NgForm){
    console.log(form);
    for(let i = 0 ; i < this.documents.length ; i++) {
      form.controls["documents["+i+"].isChecked"].setValue(true) ;
    }
  }

  onAnnuler(form : NgForm){
    for(let i = 0 ; i < this.documents.length ; i++) {
      form.controls["documents["+i+"].isChecked"].setValue(false) ;
    }
    this.showAllDocument = false ;
  }

  onTraiter(){

  }
  onChangeCheckbox(el ){
    console.log("onChangeCheckbox ==>" , el);

  }
}
