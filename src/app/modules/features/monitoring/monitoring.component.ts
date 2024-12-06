import { Component, OnInit } from '@angular/core';

import { DataStoreService } from '../datastore/services/datastore.service';

import { Chart, ChartTypeRegistry } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import ChartDatasourcePrometheusPlugin from 'chartjs-plugin-datasource-prometheus';
import { KeycloakClientAutheService } from '@core/guards/keycloak-client-auth.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MonitoringService } from './services/monitoring.service';
import { getElapsedDaysOfCurrentMonth } from '@core/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

Chart.register(ChartDatasourcePrometheusPlugin);

const CLOUD_PROMETHEUS = "http://52.47.105.88:30090";
const VICOM_PROMETHEUS = "http://5gmeta.vicomtech.org/prometheus";

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {
  currentUser: string;
  currentUserUpperCase: string;
  topics: string[];
  dataPrice: number; //€ per MB
  totalVolume: number;
  totalCost: number;
  dataVolumeChart: Chart;
  dataVolumeTotalChart: Chart;
  costChart: Chart;
  costTotalChart: Chart;
  memoryUsageChart: Chart;
  cpuUsageChart: Chart;
  selectedDaysTotalVolume: number = 30;
  selectedDaysTopic: number = 30;
  allTopicLabel = "All"
  selectedTopic: string = this.route.snapshot.params['id'] ? this.route.snapshot.params['id'] : this.allTopicLabel;
  PerTopicChartTextLabel = "Per topic";
  TotalConsumedChartTextLabel = "Total";
  X_userInfo = '';
  dailyCostTextLabel = "Daily";
  accumulatedCostTextLabel = "Accumulated";
  availableDays: any[] = [
    { label: 'Last 1 day', value: 1 },
    { label: 'Last 3 days', value: 3 },
    { label: 'Last 7 days', value: 7 },
    { label: 'Last 30 days', value: 30 },
    { label: 'Current month', value: getElapsedDaysOfCurrentMonth() }

  ];

  constructor(
    private dataStoreService: DataStoreService,
    private monitoringService: MonitoringService,
    private keycloakClientAutheService: KeycloakClientAutheService,
    private ngxUiLoader: NgxUiLoaderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.currentUser = this.keycloakClientAutheService.getUserName();
    this.X_userInfo = this.keycloakClientAutheService['auth']['_userProfile']['id'];
    this.currentUserUpperCase = this.currentUser.toUpperCase();
    this.dataPrice = 0.005;
  }

  ngOnInit(): void {
    this.ngxUiLoader.start();
    this.dataStoreService.getAllTopics(this.X_userInfo).subscribe(async topics => {
      this.topics = topics;
      await new Promise(f => setTimeout(f, 250)); // Ensure that this.createAllCharts is called after this.topics is set
      this.createDataVolumePerTopicChart();
      this.ngxUiLoader.stop();
    });



    this.monitoringService.getTotalVolume(this.currentUser).subscribe(data => {
      this.totalVolume = data.data.result[0].value[1]; //Check Promotheus' returned data
    })

    this.monitoringService.getTotalCost(this.currentUser, this.dataPrice).subscribe(data => {
      this.totalCost = data.data.result[0].value[1]; //Check Promotheus' returned data
    })
  }

  private createDataVolumePerTopicChart() {

    //Create volume chart
    //Create chart for all active topics
    let queries: string[] = [];
    let labels = new Map<string, string>();
    if (this.route.snapshot.params['id']) {
      let query = this.getPerTopicConsumedQuery(this.route.snapshot.params['id']);
      queries.push(query);
      labels.set(this.route.snapshot.params['id'], this.route.snapshot.params['id']);
    } else {
      for (let topic of this.topics) {
        let query = this.getPerTopicConsumedQuery(topic);
        queries.push(query);
        labels.set(topic, topic);

      }

    }
    if (this.dataVolumeChart != null) this.dataVolumeChart.destroy();
    this.dataVolumeChart = this.createChart('dataVolumeChart', 'line', CLOUD_PROMETHEUS, queries, this.selectedDaysTopic, labels);
    this.dataVolumeChart.update()
  }

  private createDataVolumeTotalChart() {
    //Create chart for all topics for the month
    let totalVolumeQuery = this.getTotalConsumedQuery(this.selectedDaysTotalVolume);
    let totalLabel = new Map<string, string>([["undefined", "Total consumption"]]);
    if (this.dataVolumeTotalChart != null) this.dataVolumeTotalChart.destroy();
    this.dataVolumeTotalChart = this.createChart('dataVolumeTotalChart', 'line', CLOUD_PROMETHEUS, totalVolumeQuery, this.selectedDaysTotalVolume, totalLabel, 10000);
    this.dataVolumeChart.update()
  }

  private createCostCharts() {
    this.createDailyCostChart();
    this.createCostTotalChart();

  }
  private createDailyCostChart() {
    //Create daily cost chart

    let costQueries: string[] = [];
    let labels = new Map<string, string>();

    for (let topic of this.topics) {
      let query = 'kafka_consumer_consumer_fetch_manager_metrics_bytes_consumed_total{client_id=~".*' + topic + '.*",container="prometheus-jmx-exporter"}*' + this.dataPrice + '/1000000'
      costQueries.push(query);
      labels.set(topic, topic);
    }

    let dailyCostQuery = 'sum(increase(kafka_consumer_consumer_fetch_manager_metrics_bytes_consumed_total{client_id=~".*' + this.currentUserUpperCase + '.*",container="prometheus-jmx-exporter"}[1d]))*' + this.dataPrice + '/1000000';

    let dailyCostLabel = new Map<string, string>([["undefined", "Daily cost"]]);

    this.costChart = this.createChart('costChart', 'bar', CLOUD_PROMETHEUS, dailyCostQuery, this.selectedDaysTotalVolume, dailyCostLabel, 86400);
  }

  updateTopicChart(topicLabel: string) {

    let queries: string[] = [];
    if (topicLabel === this.allTopicLabel) {
      for (let topic of this.topics) {
        let query = this.getPerTopicConsumedQuery(topic);
        queries.push(query);
      }
      this.router.navigate(['/monitoring'])
    } else {

      this.router.navigate(['/monitoring', topicLabel])
      this.createDataVolumePerTopicChart();
      queries[0] = this.getPerTopicConsumedQuery(topicLabel);
    }

    if (this.dataVolumeChart?.options?.plugins?.['datasource-prometheus']?.query !== undefined) {
      this.dataVolumeChart.options.plugins['datasource-prometheus'].query = queries;
    }

  }

  updateTopicChartTime(relativeDays: Number) {
    if (this.dataVolumeChart?.options?.plugins?.['datasource-prometheus']?.timeRange?.start !== undefined) {
      this.dataVolumeChart.options.plugins['datasource-prometheus'].timeRange.start = this.convertDaysToMiliSeconds(relativeDays)
    }
    this.dataVolumeChart.update();
  }

  protected onSelectedTabChanged(event: MatTabChangeEvent) {
    if (this.costChart !== undefined) {
      this.costChart.destroy();
    }

    if (this.costTotalChart !== undefined) {
      this.costTotalChart.destroy();
    }

    if (this.cpuUsageChart !== undefined) {
      this.cpuUsageChart.destroy();
    }

    if (this.memoryUsageChart !== undefined) {
      this.memoryUsageChart.destroy();
    }

    // Create cost charts
    if (event.tab.textLabel === 'Cost') {
      this.createCostCharts();
    }
  }

  protected onSelectedDataVolumeSubTabChanged(event: MatTabChangeEvent) {

    if (event.tab.textLabel === this.PerTopicChartTextLabel) {
      if (this.dataVolumeChart !== undefined) {
        this.updateTopicConsumedChart(this.selectedTopic)
      } else {
        this.createDataVolumePerTopicChart();
      }
    }

    if (event.tab.textLabel === this.TotalConsumedChartTextLabel) {
      if (this.dataVolumeTotalChart !== undefined) {
        this.updateTotalDataVolumeChart(this.selectedDaysTotalVolume)
      } else {
        this.createDataVolumeTotalChart();
      }
    }
  }



  private createCostTotalChart() {

    let totalCostQuery = 'sum(increase(kafka_consumer_consumer_fetch_manager_metrics_bytes_consumed_total{client_id=~".*' + this.currentUserUpperCase + '.*",container="prometheus-jmx-exporter"}[30d]))*' + this.dataPrice + '/1000000';

    let totalCostLabel = new Map<string, string>([["undefined", "Accumulated cost"]]);

    this.costTotalChart = this.createChart('costTotalChart', 'line', CLOUD_PROMETHEUS, totalCostQuery, this.selectedDaysTotalVolume, totalCostLabel, 10000);

  }
  protected onSelectedCostSubTabChanged(event: MatTabChangeEvent) {
    if (event.tab.textLabel === this.dailyCostTextLabel) {
      if (this.costChart !== undefined) {
        this.updateDailyCostChartTime(this.selectedDaysTopic)
      } else {
        this.createDailyCostChart();
      }
    }

    if (event.tab.textLabel === this.accumulatedCostTextLabel) {
      if (this.costTotalChart !== undefined) {
        this.updateTotalCostChart(this.selectedDaysTotalVolume)
      } else {
        this.createCostTotalChart();
      }
    }
  }
  private createChart(chartID: string, type: keyof ChartTypeRegistry, endpoint: string, query: string | string[], range: number, labels?: Map<string, string>, step?: number) {
    const chart = new Chart(chartID, {
      // type : (Type of chart)
      type: type,
      data: { labels: [], datasets: [] }, // Values on X-Axis (empty if using Promotheus data source)
      options: {
        // aspectRatio: 2.5
        plugins: {
          'datasource-prometheus': {
            prometheus: {
              endpoint: endpoint,
              // endpoint: 'https://prometheus.demo.do.prometheus.io',
              // default value
              baseURL: '/api/v1'
            },
            // query: 'kafka_producer_producer_topic_metrics_byte_total{topic=~"5GMETA_1000.*"}',
            query: query,
            timeRange: {
              type: 'relative',

              // from 24 hours ago to now
              start: -24 * range * 60 * 60 * 1000,
              end: 0,
              step: step
            },
            // Hook to customise the label
            findInLabelMap: (serie) => {
              if (serie?.labels?.client_id === undefined) {
                return labels!.get('undefined');
              } else {
                for (const label of labels!.keys()) {
                  if (serie?.labels?.client_id?.includes(label)) {
                    return labels!.get(label);
                  }
                }
              }
              return serie?.metric?.toString();
            }
          }
        }
      }
    });
    return chart;
  }







  updateTotalCostChart(relativeDays: Number) {
    if (this.costTotalChart?.options?.plugins?.['datasource-prometheus']?.timeRange?.start !== undefined) {
      this.costTotalChart.options.plugins['datasource-prometheus'].timeRange.start = this.convertDaysToMiliSeconds(relativeDays)
    }
    if (this.costTotalChart?.options?.plugins?.['datasource-prometheus']?.query !== undefined) {
      this.costTotalChart.options.plugins['datasource-prometheus'].query = this.getTotalCostQuery(relativeDays);
    }

    this.costTotalChart.update();
  }

  updateTopicCostChart(topicLabel: string) {
    let queries: string[] = [];
    if (topicLabel === this.allTopicLabel) {
      for (let topic of this.topics) {
        let query = this.getPerTopicCostQuery(topic);
        queries.push(query);
      }
    } else {
      queries[0] = this.getPerTopicCostQuery(topicLabel);
    }

    if (this.costChart?.options?.plugins?.['datasource-prometheus']?.query !== undefined) {
      this.costChart.options.plugins['datasource-prometheus'].query = queries;
    }
    this.costChart.update();
  }

  updateDailyCostChartTime(relativeDays: Number) {
    if (this.costChart?.options?.plugins?.['datasource-prometheus']?.timeRange?.start !== undefined) {
      this.costChart.options.plugins['datasource-prometheus'].timeRange.start = this.convertDaysToMiliSeconds(relativeDays)
    }
    this.costChart.update();
  }
  updateTotalDataVolumeChart(relativeDays: Number) {
    if (this.dataVolumeTotalChart?.options?.plugins?.['datasource-prometheus']?.timeRange?.start !== undefined) {
      this.dataVolumeTotalChart.options.plugins['datasource-prometheus'].timeRange.start = this.convertDaysToMiliSeconds(relativeDays)
    }
    if (this.dataVolumeTotalChart?.options?.plugins?.['datasource-prometheus']?.query !== undefined) {
      this.dataVolumeTotalChart.options.plugins['datasource-prometheus'].query = this.getTotalConsumedQuery(relativeDays);
    }

    this.dataVolumeTotalChart.update();
  }

  updateTopicConsumedChart(topicLabel: string) {

    let queries: string[] = [];
    if (topicLabel === this.allTopicLabel) {
      for (let topic of this.topics) {
        let query = this.getPerTopicConsumedQuery(topic);
        queries.push(query);

      }
      this.router.navigate(['/monitoring'])
    } else {
      this.router.navigate([`/monitoring/+${topicLabel}`]);
      this.router.navigate(['/monitoring', topicLabel])
      this.createDataVolumePerTopicChart();
      queries[0] = this.getPerTopicConsumedQuery(topicLabel);
    }

    if (this.dataVolumeChart?.options?.plugins?.['datasource-prometheus']?.query !== undefined) {
      this.dataVolumeChart.options.plugins['datasource-prometheus'].query = queries;
    }

    this.dataVolumeChart.update();
  }

  updateTopicConsumedChartTime(relativeDays: Number) {
    if (this.dataVolumeChart?.options?.plugins?.['datasource-prometheus']?.timeRange?.start !== undefined) {
      this.dataVolumeChart.options.plugins['datasource-prometheus'].timeRange.start = this.convertDaysToMiliSeconds(relativeDays)
    }
    this.dataVolumeChart.update();
  }

  getTotalConsumedQuery(days: Number) {
    return 'sum(increase(kafka_consumer_consumer_fetch_manager_metrics_bytes_consumed_total{client_id=~".*' + this.currentUserUpperCase + '.*",container="prometheus-jmx-exporter"}[' + Number(days) + 'd]))/1000000';
  }

  getPerTopicConsumedQuery(topic: string) {
    return 'kafka_consumer_consumer_fetch_manager_metrics_bytes_consumed_total{client_id=~".*' + topic + '.*",container="prometheus-jmx-exporter"}/1000000'
  }

  getTotalCostQuery(days: Number) {
    return 'sum(increase(kafka_consumer_consumer_fetch_manager_metrics_bytes_consumed_total{client_id=~".*' + this.currentUserUpperCase + '.*",container="prometheus-jmx-exporter"}[' + Number(days) + 'd]))*' + this.dataPrice + '/1000000';
  }

  getPerTopicCostQuery(topic: string) {
    return 'sum(increase(kafka_consumer_consumer_fetch_manager_metrics_bytes_consumed_total{client_id=~".*' + topic + '.*",container="prometheus-jmx-exporter"}[1d]))*' + this.dataPrice + '/1000000';
  }


  convertDaysToMiliSeconds(days: Number) {
    return -24 * Number(days) * 60 * 60 * 1000;
  }


}
