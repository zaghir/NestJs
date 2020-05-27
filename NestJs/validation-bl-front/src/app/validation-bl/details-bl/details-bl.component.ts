import { Component, OnInit, ElementRef } from "@angular/core";
import { BlService } from "../bl.service";
import { Document } from "../dto/document.dto";
import { NgForm } from '@angular/forms';

@Component({
  selector: "app-details-bl",
  templateUrl: "./details-bl.component.html",
  styleUrls: ["./details-bl.component.css"],
})
export class DetailsBlComponent implements OnInit {
  constructor(private blService: BlService) {}

  isFetching = false;

  showAllDocument = true;

  documents: Document[];

  ngOnInit() {
    this.isFetching = true;
    this.blService.getDocuments().subscribe(
      (documents) => {
        console.log(documents);

        this.documents = [...documents] ;
        this.isFetching = false;

      },
      (error) => {
        this.isFetching = false;
        console.log("probleme de recuperation a cause de ", error);
      }
    );
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
          this.blService.saveDocument(docSave) ;
        }

      }
    }
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
