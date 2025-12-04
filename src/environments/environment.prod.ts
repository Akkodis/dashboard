export const environment = {
  production: true,
  backendUrl: {
    apiMonitoring: 'https://5gmeta-platform.eu/grafana/',
    apiDataStore: 'https://5gmeta-platform.eu'
  },
  auth: {
    domain: 'https://5gmeta-platform.eu/identity/',
    clientId: '5gmeta_login',
    realm: '5gmeta',
    redirectUri: window.location.origin + '/home'
  },
  dev: {
    serverUrl: ''
  }
};
