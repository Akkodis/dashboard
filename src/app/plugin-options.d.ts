import {ChartType, Plugin} from 'chart.js';
import { PrometheusConnectionOptions } from "prometheus-query";

export declare class PrometheusTimeRange {
    step?: number | null;
    minStep?: number | null;
    msUpdateInterval?: number | null;
}
export interface PrometheusTimeRangeRelative {
    type: 'relative';
    start: number;
    end: number;
}
export interface PrometheusTimeRangeAbsolute {
    type: 'absolute';
    start: Date;
    end: Date;
}
export declare type ChartDatasourcePrometheusPluginOptionsTimeRange = PrometheusTimeRange & (PrometheusTimeRangeRelative | PrometheusTimeRangeAbsolute);

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType = ChartType> {
    'datasource-prometheus'?: {
      prometheus?: PrometheusConnectionOptions | any;
      query?: string | string[];
      timeRange?: ChartDatasourcePrometheusPluginOptionsTimeRange;
      findInLabelMap?: (serie: any) => string;
    }
  }
}