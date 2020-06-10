import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PathsApi } from '../shared/config-urls';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConfigDto } from './dto/config.dto';

@Injectable({
  providedIn:"root"
})
export class ConfigService {

  constructor(private http : HttpClient){}


  getById(id : string) :Observable<ConfigDto> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("id" , id) ;
    return this.http
      .get<ConfigDto>(PathsApi.getConfigSearch,
        {
          responseType: "json",
          params :searchParams
        }
      );
  }

  // getByIdApplication( id: number) :Observable<ConfigDto[]> {
  //   let searchParams = new HttpParams();
  //   searchParams = searchParams.append("idApp" , ""+id) ;
  //   return this.http
  //     .get<ConfigDto[]>(PathsApi.getConfigSearch,
  //       {
  //         responseType: "json",
  //         params :searchParams
  //       }
  //     );
  // }

  getdByAppidUserId( appId: number) :Observable<ConfigDto[]> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("idApp" , ""+appId) ;
    return this.http
      .get<ConfigDto[]>(PathsApi.getConfigSearch,
        {
          responseType: "json",
          params :searchParams
        }
      );
  }

  getAll(): Observable<ConfigDto[]> {

    return this.http
    .get<ConfigDto[]>(PathsApi.config,
      {
        responseType: "json",
      }
    );
  }

  update(config : ConfigDto) :Observable<ConfigDto> {
    return this.http
      .patch<ConfigDto>(PathsApi.config,
        config
      );
  }

  add(config : ConfigDto) :Observable<ConfigDto> {
    return this.http
      .put<ConfigDto>(PathsApi.config,
        config
      );
  }

}
