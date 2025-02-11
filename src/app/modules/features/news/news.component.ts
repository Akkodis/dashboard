import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment as env } from '../../../../environments/environment';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  message: string = '';

  constructor (private http: HttpClient) { }

  ngOnInit (): void {
  }

  callApi (): void {
    this.http
      .get(`${env.dev.serverUrl}/api/messages/public-message`)
      .subscribe((result : any) => {
        this.message = result.message;
      });
  }

  callSecureApi (): void {
    this.http
      .get(`${env.dev.serverUrl}/api/messages/protected-message`)
      .subscribe((result : any) => {
        this.message = result.message;
      });
  }
}
