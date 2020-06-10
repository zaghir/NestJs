import { Injectable } from '@angular/core';
import { ApplicationDto } from './dto/application.dto';
import { PathsApi } from '../shared/config-urls';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {


  constructor(private http : HttpClient){}


  getById(id : number) :Observable<ApplicationDto> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("id" , ""+id) ;
    return this.http
      .get<ApplicationDto>(PathsApi.applicationSearch,
        {
          responseType: "json",
          params :searchParams

        }
      );
  }

  getAll(): Observable<ApplicationDto[]> {

    return this.http
    .get<ApplicationDto[]>(PathsApi.application,
      {
        responseType: "json",
      }
    );
  }

  update(domain : ApplicationDto) :Observable<ApplicationDto> {
    return this.http
      .patch<ApplicationDto>(PathsApi.application,
        domain
      );
  }

  add(domain : ApplicationDto) :Observable<ApplicationDto> {
    return this.http
      .put<ApplicationDto>(PathsApi.application,
        domain
      );
  }
}
