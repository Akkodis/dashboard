import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class KeycloakClientAutheService {
  constructor(private auth: KeycloakService) { }

  public isLoggedIn(): Promise<boolean> {
    return Promise.resolve(this.auth.isLoggedIn());
  }

  public login(): Promise<void> {

    return this.auth.login();
  }

  public logout(redirectUri?: string): Promise<void> {
    return this.auth.logout(redirectUri);
  }

  public loadUserProfile(): Promise<import('keycloak-js').KeycloakProfile> {
    this.auth.loadUserProfile().then(data => {
      let currentUserId: string;
      currentUserId = data.id || '';
      localStorage.setItem('currentUserId', currentUserId);
    });
    let profile: any;
    profile = this.auth.loadUserProfile();
    return profile;
  }

  public getToken(): Promise<string> {
    return this.auth.getToken();
  }

  public getUserName(): string {
    return this.auth.getUsername();
  }

}
