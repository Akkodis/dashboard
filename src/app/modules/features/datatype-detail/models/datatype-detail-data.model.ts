export interface dataFlowData {
  dataFlowId: number;
  dataInfo: {
    dataFormat: string;
    dataSampleRate: number;
    dataflowDirection: string;
  };
  dataSourceInfo: {
    sourceId: number;
    sourceLocationInfo: { locationCountry: string; locationQuadkey: number };
    sourceType: string;
    timeLastUpdate: number;
    timeRegistration: number;
    timeStratumLevel: number;
    timeZone: number;
  };
  dataTypeInfo: { dataSubType: string; dataType: string };
  licenseInfo: { licenseGeolimit: string; licenseType: string };
}
