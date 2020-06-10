import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PathsApi } from '../shared/config-urls';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DomainDto } from './dto/domain.dto';

@Injectable({
  providedIn:"root"
})
export class DomainService {

  constructor(private http : HttpClient){}


  getById(id : number) :Observable<DomainDto> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("id" , ""+id) ;
    return this.http
      .get<DomainDto>(PathsApi.getDomainById,
        {
          responseType: "json",
          params :searchParams

        }
      );
  }

  getAll(): Observable<DomainDto[]> {

    return this.http
    .get<DomainDto[]>(PathsApi.getDomains,
      {
        responseType: "json",
      }
    );
  }

  updateDomain(domain : DomainDto) :Observable<DomainDto> {
    return this.http
      .patch<DomainDto>(PathsApi.domain,
        domain
      );
  }

  addDomain(domain : DomainDto) :Observable<DomainDto> {
    return this.http
      .put<DomainDto>(PathsApi.domain,
        domain
      );
  }

}
