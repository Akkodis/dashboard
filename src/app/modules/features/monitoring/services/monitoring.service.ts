import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  private readonly BASE_URL = environment.backendUrl.apiMonitoring;

  constructor(private http: HttpClient) { }

  getConsumedCits(): Observable<any[]> {
    return this.http.get<string[]>(this.BASE_URL + '/cits');
  }

  getConsumedDataFlow(): Observable<any[]> {
    return this.http.get<string[]>(this.BASE_URL + '/dataflow');
  }

  getTotalVolume(user: string): Observable<any> {
    let query = 'sum(increase(kafka_consumer_consumer_fetch_manager_metrics_bytes_consumed_total{client_id=~".*' + user.toUpperCase() + '.*",container="prometheus-jmx-exporter"}[30d]))/1000000';
    let params = new HttpParams()
      .set('query', query);

    return this.http.get(
      `${this.BASE_URL}/api/v1/query`,
      {
        params: params,
      }
    );
  }

  getTotalCost(user: string, dataPrice: number): Observable<any> {
    let query = 'sum(increase(kafka_consumer_consumer_fetch_manager_metrics_bytes_consumed_total{client_id=~".*' + user.toUpperCase() + '.*",container="prometheus-jmx-exporter"}[30d]))*' + dataPrice + '/1000000';
    let params = new HttpParams()
      .set('query', query);

    return this.http.get(
      `${this.BASE_URL}/api/v1/query`,
      {
        params: params,
      }
    );
  }

}
