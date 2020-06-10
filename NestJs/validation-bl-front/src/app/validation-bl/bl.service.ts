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

  getDocuments( connectionName :string ): Observable<Document[]> {
    let params = new HttpParams();
    params = params.append("connectionName" ,connectionName) ;

    return this.http
      .get<Document[]>(PathsApi.getDocuments,
        {
          responseType: "json",
          params : params
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

  saveDocument(document: Document , connectionName: string) {

    let params = new HttpParams();
    params = params.append("connectionName" ,connectionName) ;

    return this.http
      .post(
        PathsApi.saveDocument,
        document ,
        {
          responseType: "json",
          params : params
        })
      .subscribe((response) => {
        console.log("saveDocument ===> ",response);
      });
  }

  getDocNumero(connectionName: string) {

    let params = new HttpParams();
    params = params.append("connectionName" ,connectionName) ;
    params.append("id" ,"") ;
    return this.http
      .get<Document>(PathsApi.getDocNumero,
        {
          responseType: "json",
          params :params

        }
      );
  }

  saveLigneDocument(ligDoc: LigneDocument , connectionName : string) {
    let params = new HttpParams();
    params = params.append("connectionName" ,connectionName) ;

    return this.http
      .put(
        PathsApi.saveLigneDocument,
        ligDoc ,
        {
          responseType: "json",
          params : params
        })
      .subscribe((response) => {
        console.log(response);
      });
  }

  updateDocument(idDoc: string , connectionName :string) {
    let params = new HttpParams();
    params = params.append("connectionName" ,connectionName) ;

    return this.http
      .patch(
        PathsApi.saveLigneDocument,
        idDoc,
        {
          responseType : "json" ,
          params:params
        }
        )
      .subscribe((response) => {
        console.log(response);
      });
  }
}
