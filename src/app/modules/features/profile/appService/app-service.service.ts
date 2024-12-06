import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { dataFlowData } from '../../datastore/models/dataflow-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }
  // URL_DB = 'http://20.199.90.04'
  URL_DB = 'http://dashboard-5gmeta.francecentral.cloudapp.azure.com';
  private url_businessInfos = 'http://dashboard-5gmeta.francecentral.cloudapp.azure.com:8080/user-business-info';
  // 'http://localhost:8080/user-business-info';
  PORT_NUM = '8080';
  getData() {
    return this.http.get(this.URL_DB + ':' + this.PORT_NUM + "/users");
  }
  updateData(username: string, value: any) {
    return this.http.put(this.URL_DB + ':' + this.PORT_NUM + '/users/' + username, value);
  }
  deleteData(username: string) {
    return this.http.delete(this.URL_DB + ':' + this.PORT_NUM + '/users/' + username);
  }

  addBusinessInfo(data: any): Observable<Object> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.url_businessInfos}/signup`, JSON.stringify(data), { headers: headers });
  }

  getBusinessInfoById(id: String): Observable<Object> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(`${this.url_businessInfos}/${id}`, { headers: headers });
  }

}
