import { environment } from 'environments/environment';
import { KeycloakService } from 'keycloak-angular';

/**
 * keycloak configuration => to connect to Keycloak server
 * config.url => the url of Keycloak server (on azure)
 * config.realm => the realm created in Keycloak for the 5gmeta
 * config.clientId => the clientId created in Keycloak for this angular as a Keycloak client
 */
export const initializeKeycloak = (keycloak: KeycloakService) => {
  return () =>
    keycloak.init({
      config: {
        url: environment.auth.domain,
        realm: environment.auth.realm,
        clientId: environment.auth.clientId
      },
      bearerExcludedUrls: ['/assets'],
      initOptions: {
        checkLoginIframe: false,
        checkLoginIframeInterval: 25
        /*onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
            window.location.origin + '/assets/silent-check-sso.html'*/
      }
    });
}
