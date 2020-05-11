import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { PathsApi } from "../shared/config-urls";
import { Document } from "./dto/document.dto";
import { LigneDocument } from "./dto/ligne-document.dto";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class BlService {
  constructor(private http: HttpClient) {}

  // getDocuments :`${urlHost}/validation-bl/documents`,
  // saveDocument :`${urlHost}/validation-bl/documents`,
  // getDocNumero :`${urlHost}/validation-bl/documents/docLig/:id`,
  // saveLigneDocument :`${urlHost}/validation-bl/documents/lignedocument` ,
  // updateDocument :`${urlHost}/validation-bl/documents/:id`,

  getDocuments(): Observable<Document[]> {
    return this.http
      .get<Document[]>(PathsApi.getDocuments,
        {
          responseType: "json",
        }
      )
      .pipe(
        map(documents=>{
          let docs :Document[] ;
          documents.forEach(d => {

          });
          return documents ;
        })
      );
  }

  saveDocument(document: Document) {

    return this.http
      .post(PathsApi.saveDocument, document)
      .subscribe((response) => {
        console.log("saveDocument ===> ",response);
      });
  }

  getDocNumero() {
    let searchParams = new HttpParams();
    searchParams.append("id" ,"") ;
    return this.http
      .get<Document>(PathsApi.getDocNumero,
        {
          responseType: "json",
          params :searchParams

        }
      );
  }

  saveLigneDocument(ligDoc: LigneDocument) {
    return this.http
      .put(PathsApi.saveLigneDocument, ligDoc)
      .subscribe((response) => {
        console.log(response);
      });
  }

  updateDocument(idDoc: string) {
    return this.http
      .patch(PathsApi.saveLigneDocument, idDoc)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
