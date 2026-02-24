import { environment } from 'environments/environment';
import { Reservation } from './../../../../shared/interfaces/reservation';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { dataFlowData } from '../models/dataflow-data.model';
import { Sla } from '@shared/interfaces/sla';
import { tap, map } from 'rxjs/operators';
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

  private getBaseUrl(): string {
    return environment.withMockData ? environment.backendUrl.apiMockData : this.BASE_URL;
  }

  getTile(): Observable<string[]> {
    if (environment.withMockData) {
      return this.http.get<Array<{ id: string }>>(`${this.getBaseUrl()}/mec/tile`).pipe(
        map(tiles => tiles.map(t => t.id))
      );
    }

    return this.http.get<string[]>(this.BASE_URL + '/mec/tile');
  }

  getDataTypesInTile(tile: string): Observable<any> {

    let usedUrl: string;

    if (environment.withMockData) {
      // json-server stores datatypes as an array of objects { id: tile, data: [...] }
      // query by id and return the nested 'data' array or an empty array if not found
      return this.http.get<Array<{ id: string; data: any[] }>>(`${this.getBaseUrl()}/datatypes`, { params: new HttpParams().set('id', tile) }).pipe(
        map(res => (res && res.length) ? res[0].data : [])
      );
    }

    usedUrl = this.BASE_URL + '/datatypes/' + tile
    
    return this.http.get<any>(usedUrl)
  }

  getDatatypeProperties(dataType: string): Observable<any> {
    if (environment.withMockData) {
      // Use datatypesProperties endpoint for mock data
      return this.http.get<any>(`${this.getBaseUrl()}/datatypesProperties/${dataType}`).pipe(
        map(res => res.subtypes)
      );
    }
    let usedUrl: string;
    usedUrl = this.BASE_URL + `/datatypes/${dataType}/properties`
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

    if (environment.withMockData) {
      // for the use of mockData
      return this.http.get<any>(`${this.getBaseUrl()}/SubtypeCits`).pipe(
        map(res => res.count)
      );
    } else {
    let usedUrl: string;
    usedUrl = `${this.BASE_URL}/dataflows/${dataType}/query/count`, { params: params }

    return this.http.get(usedUrl)
    }
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

    if (environment.withMockData) {
      // for the use of mockData
      return this.http.get<any>(`${this.getBaseUrl()}/SubtypeCitsquery`).pipe(
        map(res => res.map(item => item.id))
      );
    } else {
    let usedUrl: string;
    usedUrl = `${this.getBaseUrl()}/dataflows/${dataType}/query`;

    return this.http.get(usedUrl)
    }

  }

  getDataFlowById(id: number): Observable<dataFlowData> {

    if (environment.withMockData) {
      // for the use of mockData
      return this.http.get<dataFlowData>(`${this.getBaseUrl()}/${id}`);
    } else {
    let usedUrl: string;
    usedUrl = `${this.BASE_URL}/dataflow-api/dataflows/${id}`
    return this.http.get<dataFlowData>(usedUrl)
    }

  }

  getMec(tile: string): Observable<any> {
    if (environment.withMockData) {
      return this.http.get<any>(`${this.getBaseUrl()}/mectile/${tile}`).pipe(
        map(data => [data]) // Return as array instead of object
      );
    }
    return this.http.get<any>(
      `${this.BASE_URL}/mec/tile/${tile}`
    );
  }

  getInstanceTypes(mecID: string): Observable<Sla[]> {
    if (environment.withMockData) {
      return this.http.get<Array<{ id: string; types: Sla[] }>>(`${this.getBaseUrl()}/mecs`, { params: new HttpParams().set('id', mecID) }).pipe(
        map(res => (res && res.length) ? res[0].types : [])
      );
    }
    return this.http.get<Sla[]>(`${this.BASE_URL}/mecs/${mecID}/types`);
  }

  saveReservation(idMec: string, data: any): Observable<Reservation> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('X_Userinfo', data.X_Userinfo);
    return this.http.post<any>(
      `${this.getBaseUrl()}/mecs/${idMec}/instances`,
      data
    );
  }

  deleteDeployedInstance(idReservation: string, idMec: string): Observable<any> {
    return this.http.delete<any>(
      `${this.getBaseUrl()}/mecs/${idMec}/instances/${idReservation}`
    );
  }

  deleteTopic(topicName: string, X_userInfo: string): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('X_Userinfo', X_userInfo);
    return this.http.delete<any>(
      `${this.getBaseUrl()}/topics/${topicName}`);
  }

  getDeployedInstances(idMec: string): Observable<Reservation[]> {
    if (environment.withMockData) {
      return this.http.get<Array<{ id: string; instances: Reservation[] }>>
      (`${this.getBaseUrl()}/mecs`,{ params: new HttpParams().set('id', idMec) })
       .pipe(
        map(res => (res && res.length) ? res[0].instances : [])
      );
    }
    return this.http.get<Reservation[]>(
      `${this.BASE_URL}/mecs/${idMec}/instances`
    );
  }

  getTopicByName(topicName: string, X_userInfo: string): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('X_Userinfo', X_userInfo);

    if (environment.withMockData) {
      // json‑server mock backend only exposes a flat array of topic strings so
      // doing a GET /topics/:name returns 404. the topic detail component does
      // not actually use the returned object yet, it just needs the name, so
      // return an observable that emits a simple object and completes.
      return of({ name: topicName });
    }

    return this.http.get<any>(`${this.getBaseUrl()}/topics/${topicName}`, { headers: httpHeaders });
  }
  getAllTopics(X_userInfo: string): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('X_Userinfo', X_userInfo);
    return this.http.get<any>(`${this.getBaseUrl()}/topics`, { headers: httpHeaders });
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
      `${this.getBaseUrl()}/topics/${datatype}/query`,{}
    );
  }
}