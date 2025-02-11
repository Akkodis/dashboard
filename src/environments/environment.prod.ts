export const environment = {
  production: true,
  backendUrl: {
    apiMonitoring: 'http://grafana.5gmeta-platform.eu',
    apiDataStore: 'http://5gmeta-platform.eu'
  },
  auth: {
    domain: 'http://5gmeta-platform.eu/identity/',
    clientId: '5gmeta_login',
    realm: '5gmeta',
    redirectUri: window.location.origin + '/home'
  },
  dev: {
    serverUrl: ''
  }
};
