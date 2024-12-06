import { environment } from 'environments/environment';
import { Reservation } from '../../../../shared/interfaces/reservation';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sla } from '@shared/interfaces/sla';
import { dataFlowData } from '../models/datatype-detail-data.model';

@Injectable({
  providedIn: 'root'
})
export class DatatypeDetailService {
  private readonly BASE_URL = environment.backendUrl.apiDataStore;

  constructor(private http: HttpClient) { }

  getTile(): Observable<any[]> {
    return this.http.get<string[]>(this.BASE_URL + '/discovery-api/mec/tile');
  }

  getDataTypeFlow(id: string): Observable<any> {
    return this.http.get<any>(
      this.BASE_URL + '/dataflow-api/datatypes/' + id
    );
  }

  getDataFlowList(dataSubType: string, dataType: string): Observable<any> {
    const params = new HttpParams();
    params.set('dataSubType', dataSubType);
    return this.http.get(
      `${this.BASE_URL}/dataflow-api/dataflows/${dataType}/query`,
      {
        params: params
      }
    );
  }

  getDataFlowById(id: number): Observable<dataFlowData> {
    return this.http.get<dataFlowData>(
      `${this.BASE_URL}/dataflow-api/dataflows/${id}`
    );
  }

  getMec(tile: string): Observable<any> {
    return this.http.get<any>(
      `${this.BASE_URL}/discovery-api/mec/tile/${tile}`
    );
  }

  getSlas(id: string): Observable<Sla[]> {
    return this.http.get<Sla[]>(`${this.BASE_URL}/cloudinstance-api/mecs/${id}/types`);
  }

  saveReservation(idMec: string, data: any): Observable<Reservation> {
    return this.http.post<any>(
      `${this.BASE_URL}/cloudinstance-api/mecs/${idMec}/instances`,
      data
    );
  }

  supprimerReservation(idReservation: string, idMec: string): Observable<any> {
    return this.http.delete<any>(
      `${this.BASE_URL}/cloudinstance-api/mecs/${idMec}/instances/${idReservation}`
    );
  }

  suprimerTopic(idReservation: string, topicName: string): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('X_Userinfo', idReservation);
    return this.http.delete<any>(
      `${this.BASE_URL}/dataflow-api/topics/${topicName}`, {
      headers: httpHeaders
    });
  }

  getListReservation(idMec: string): Observable<Reservation[]> {
    return this.http.get<any>(
      `${this.BASE_URL}/cloudinstance-api/mecs/${idMec}/instances`
    );
  }

  getAllTopic(idReservation: any): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('X_Userinfo', idReservation);
    return this.http.get<any>(`${this.BASE_URL}/dataflow-api/topics`, {
      headers: httpHeaders
    });
  }

  reserverTopic(
    tile: string,
    datatype: string,
    idReservation: any
  ): Observable<any> {
    const params = new HttpParams();
    const httpHeaders = new HttpHeaders();
    params.set('quadkey', tile);
    httpHeaders.set('X_Userinfo', idReservation);
    httpHeaders.set('Content-Type', 'text/plain');
    httpHeaders.set('Accept', 'text/plain');

    return this.http.post<any>(
      `${this.BASE_URL}/dataflow-api/topics/${datatype}/query`,
      {
        params: params
      },
      {
        headers: httpHeaders
      }
    );
  }
}
