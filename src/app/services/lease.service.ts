import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import leaseDetail from "../interefaces/leaseDetail";

@Injectable()
export class LeaseService {

  constructor(private http: HttpClient){
    console.log('LeaseService constructor is called');
  }

  getLease(leaseId): Observable<leaseDetail>{

    const BASE_API_URL = environment.leaseService.base_url;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.get<leaseDetail>(BASE_API_URL+`/${leaseId}`, httpOptions);
  }
}
