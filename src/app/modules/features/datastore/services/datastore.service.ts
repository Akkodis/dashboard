import { environment } from 'environments/environment';
import { Reservation } from './../../../../shared/interfaces/reservation';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { dataFlowData } from '../models/dataflow-data.model';
import { Sla } from '@shared/interfaces/sla';
import { KeycloakClientAutheService } from '@core/guards/keycloak-client-auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private readonly BASE_URL = environment.backendUrl.apiDataStore;

  X_userInfo = '';
  constructor(private http: HttpClient,
  ) {

  }

  getTile(): Observable<any[]> {
    return this.http.get<string[]>(this.BASE_URL + '/discovery-api/mec/tile');
  }

  getDataTypesInTile(tile: string): Observable<any> {

    let usedUrl: string;
    // if (environment.withMockData) {
    //   // for the use of mockData
    //   usedUrl = environment.backendUrl.apiMockData + '/datatypes/'
    // } else {
    usedUrl = this.BASE_URL + '/dataflow-api/datatypes/' + tile
    // }

    return this.http.get<any>(usedUrl)

  }

  getDatatypeProperties(dataType: string): Observable<any> {
    let usedUrl: string;
    // if (environment.withMockData) {
    //   // for the use of mockData
    //   usedUrl = environment.backendUrl.apiMockData + `/SubtypeCits`
    // } else {
    usedUrl = this.BASE_URL + `/dataflow-api/datatypes/${dataType}/properties`
    //  }
    return this.http.get<any>(usedUrl)
  }

  countDataflows(quadkey: string, dataType: string, dataSubType?: string): Observable<any> {
    var params;

    if (dataSubType == undefined)
      params = new HttpParams()
        .set('quadkey', quadkey)

    else
      params = new HttpParams()
        .set('quadkey', quadkey)
        .set('dataSubType', dataSubType);

    let usedUrl: string;
    // if (environment.withMockData) {
    //   // for the use of mockData
    //   usedUrl = environment.backendUrl.apiMockData + `/SubtypeCits`
    // } else {
    usedUrl = `${this.BASE_URL}/dataflow-api/dataflows/${dataType}/query/count`, { params: params }
    // }

    return this.http.get(usedUrl)

  }

  getDataflowIDs(quadkey: string, dataType: string, dataSubType?: string): Observable<any> {

    var params;

    if (dataSubType == undefined)
      params = new HttpParams()
        .set('quadkey', quadkey)

    else
      params = new HttpParams()
        .set('quadkey', quadkey)
        .set('dataSubType', dataSubType);

    let usedUrl: string;
    // if (environment.withMockData) {
    //   // for the use of mockData
    //   usedUrl = environment.backendUrl.apiMockData + '/SubtypeCitsquery'
    // } else {
    usedUrl = `${this.BASE_URL}/dataflow-api/dataflows/${dataType}/query`, { params: params }
    // }

    return this.http.get(usedUrl)

  }

  getDataFlowById(id: number): Observable<dataFlowData> {


    let usedUrl: string;
    // if (environment.withMockData) {
    //   // for the use of mockData
    //   usedUrl = environment.backendUrl.apiMockData + '/' + id
    // } else {
    usedUrl = `${this.BASE_URL}/dataflow-api/dataflows/${id}`
    // }
    return this.http.get<dataFlowData>(usedUrl)

  }

  getMec(tile: string): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}/discovery-api/mec/tile/${tile}`
    );
  }

  getInstanceTypes(mecID: string): Observable<Sla[]> {
    return this.http.get<Sla[]>(`${this.BASE_URL}/cloudinstance-api/mecs/${mecID}/types`);
  }

  saveReservation(idMec: string, data: any): Observable<Reservation> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('X_Userinfo', data.X_Userinfo);
    return this.http.post<any>(
      `${this.BASE_URL}/cloudinstance-api/mecs/${idMec}/instances`,
      data
    );
  }

  deleteDeployedInstance(idReservation: string, idMec: string): Observable<any> {
    return this.http.delete<any>(
      `${this.BASE_URL}/cloudinstance-api/mecs/${idMec}/instances/${idReservation}`
    );
  }

  deleteTopic(topicName: string, X_userInfo: string): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('X_Userinfo', X_userInfo);
    return this.http.delete<any>(
      `${this.BASE_URL}/dataflow-api/topics/${topicName}`);
  }

  getDeployedInstances(idMec: string): Observable<Reservation[]> {
    return this.http.get<any>(
      `${this.BASE_URL}/cloudinstance-api/mecs/${idMec}/instances`
    );
  }

  getTopicByName(topicName: string, X_userInfo: string): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('X_Userinfo', X_userInfo);
    return this.http.get<any>(`${this.BASE_URL}/dataflow-api/topics/${topicName}`);
  }
  getAllTopics(X_userInfo: string): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('X_Userinfo', X_userInfo);
    return this.http.get<any>(`${this.BASE_URL}/dataflow-api/topics`);
    //
    // of(['1111111111111111111', '22222222', '33333333', '44444444']);
  }

  reserverTopic(
    tile: string,
    datatype: string,
    instanceType: string,
    X_userInfo: string,
    subtype?: string,

  ): Observable<any> {
    var params;


    if (subtype == undefined) {

      params = new HttpParams()
        .set('instance_type', instanceType)
        .set('quadkey', tile);
    } else {

      params = new HttpParams()
        .set('instance_type', instanceType)
        .set('quadkey', tile)
        .set('dataSubType', subtype);
    }



    const httpHeaders = new HttpHeaders();

    httpHeaders.set('content-type', 'application/json');
    httpHeaders.set('X_userInfo', X_userInfo);

    return this.http.post<any>(
      `${this.BASE_URL}/dataflow-api/topics/${datatype}/query`, X_userInfo,
      {
        params: params
      }
    );
  }
}
