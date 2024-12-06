export const environment = {
  production: true,
  backendUrl: {
    apiMonitoring: "http://52.47.105.88:30090",
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
