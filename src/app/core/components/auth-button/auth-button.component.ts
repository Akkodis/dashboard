import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { KeycloakClientAutheService } from '@core/guards/keycloak-client-auth.service';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit {
  isLoggedIn: Promise<boolean>;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: KeycloakClientAutheService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
  }

  login() {
    this.auth.login();
  }
}
