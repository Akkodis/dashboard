// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
  backendUrl: {
    apiMonitoring: "http://grafana.5gmeta-platform.eu",
    apiDataStore: "https://5gmeta-platform.eu",
    apiMockData: "http://localhost:3000"
  },
  auth: {
    domain: "http://5gmeta-platform.eu/identity/", /* To debug with keycloack on localhost, change this value to "http://localhost:8080" */
    clientId: "5gmeta_login",
    realm: "5gmeta",
    redirectUri: window.location.origin + "/home",
  },
  dev: {
    serverUrl: "http://localhost:6060",
  },
  withMockData: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
// "concurrently \"ng serve\" \"json-server --watch mock-db.json\""
