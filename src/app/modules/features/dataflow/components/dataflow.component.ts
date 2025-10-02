import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { KeycloakClientAutheService } from '@core/guards/keycloak-client-auth.service';
import { DataStoreService } from '../../datastore/services/datastore.service';
import { DataflowDialogComponent } from './dataflow-detail/dataflow-dialog/dataflow-dialog.component';
import { TopicDialogComponent } from './dataflow-detail/topic-dialog/topic-dialog.component';
import { Sla } from '@shared/interfaces/sla';
import { Reservation } from '@shared/interfaces/reservation';
import { Clipboard } from '@angular/cdk/clipboard';
import { BreadcrumbService } from 'xng-breadcrumb';
import { environment } from 'environments/environment';
import { DialogService } from '@core/services/dialog.service';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-dataflow',
    templateUrl: './dataflow.component.html',
    styleUrls: ['./dataflow.component.scss'],
    standalone: false
})
export class DataFlowComponent implements OnInit {
  dataflowIDs$: Observable<number[]>;
  topicName$: Observable<any>;
  topicName: string;
  dataType: string;
  dataTypeProperties: Observable<any>;
  subtypes: string[];
  realsubtypes: string[];
  icon: string;
  selected: number;
  tile: string;
  idMec: string;
  instanceTypes$: Observable<Sla[]>;
  // reservation$: Observable<Reservation>;
  deployedInstances$: Observable<Reservation[]>;
  isLoading = true;
  currentUser: string;
  hasSubscribed = false;
  chosenInstanceType: string;
  topics: string[];
  xUserInfo = '';

  constructor (
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dataStoreService: DataStoreService,
    private keycloakClientAutheService: KeycloakClientAutheService,
    private dialog: MatDialog,
    private clipboard: Clipboard,
    private toastr: ToastrService,
    private breadcrumbService: BreadcrumbService,
    private dialogService: DialogService
  ) {
    this.currentUser = this.keycloakClientAutheService.getUserName();
    this.realsubtypes = [];
    this.xUserInfo = this.keycloakClientAutheService['auth']['_userProfile']['id'];
  }

  ngOnInit () {
    // -- update Breadcrumbs
    this.updateBreadcrumbs();

    this.dataTypeProperties = this.activeRoute.paramMap.pipe(
      switchMap((params) => {
        this.tile = params.get('tile') ?? '';
        this.dataType = params.get('datatype') ?? '';

        this.dataStoreService.getMec(this.tile).subscribe(data => {
          this.idMec = data[0].id;
          this.getDeployedInstances();
          this.deployedInstances$.subscribe(data => {
            if (data.length !== 0) {
              for (const subscription of data) {
                if (subscription.username === this.currentUser) {
                  this.hasSubscribed = true;
                  break;
                }
              }
            }
            this.dataStoreService.getAllTopics(this.xUserInfo).subscribe(data => {
              this.topics = data;
            });
          })
        });

        return this.dataStoreService.getDatatypeProperties(this.dataType);
      })
    );

    this.dataTypeProperties.subscribe(async data => {
      if (data?.dataSubType?.length === 0) {
        this.router.navigate(['/dataflow'], {
          queryParams: { subtype: '', datatype: this.dataType, tile: this.tile, idMec: this.idMec }
        });
      } else {
        // if (environment.withMockData) {
        //   // for the use of mockData, will be replaced by the above
        //   this.subtypes = data;
        // } else {
        this.subtypes = data.dataSubType;
        // }

        // -------------------------------------------------------
        for (const subtype of this.subtypes) {
          // Introduce delay to avoid HTTP 500 from the backend
          await new Promise(f => setTimeout(f, 250));
          this.dataStoreService.countDataflows(this.tile, this.dataType, subtype).subscribe(
            count => {
              if (count !== 0) {
                this.realsubtypes.push(subtype);
              }
            }
          );
        }
      }
    });

    this.currentUser = this.keycloakClientAutheService.getUserName();
  }

  // --- navigate to next page
  onSelectCard (subtype: string) {
    this.router.navigate(['tile', this.tile, 'datatype', this.dataType, 'dataflow', subtype, this.idMec]);
  }

  subscribe () {
    //  this.dialogService.openConfirmDialog('Confirm subscription with', this.idMec);

    this.instanceTypes$ = this.dataStoreService.getInstanceTypes(this.idMec).pipe(
      map((data: Sla[]) => {
        return data
          .sort((a, b) => a.type_name.localeCompare(b.type_name))
          .reverse();
      })
    );

    const dialogRef = this.dialog.open(DataflowDialogComponent, {
      width: '550px',
      data: { listSla: this.instanceTypes$ }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogService.openConfirmDialog('Confirm subscription with ' + result.type_name, '')
          .afterClosed().subscribe(resp => {
            if (resp) {
              this.chosenInstanceType = result.type_name;
              this.reserveSla(result);
            }
          })
      }
    });
  }

  public deleteTopics () {
    this.dialogService.openConfirmDialog('Delete all the topics?', '')
      .afterClosed().subscribe(resp => {
        if (resp) {
          this.dataStoreService.getDeployedInstances(this.idMec).subscribe(instances => {
            for (const instance of instances) {
              if (instance.username === this.currentUser) {
                this.dataStoreService.deleteDeployedInstance(instance.instance_id, this.idMec).subscribe();
              }
            }

            this.dataStoreService.getAllTopics(this.xUserInfo).subscribe(topics => {
              for (const topic of topics) {
                this.dataStoreService.deleteTopic(topic, this.xUserInfo).subscribe(resp => {
                // nothing needed here
                });
              }
            })

            this.hasSubscribed = false;
          });
        }
      })
    //  if (confirm('Delete all the topics?')) {

    // }
  }

  public deleteReservation (idReservation: string, topic: string) {
    this.dialogService.openConfirmDialog('Confirm subscription cancellation for ' + topic, '?')
      .afterClosed().subscribe(resp => {
        if (resp) {
          this.isLoading = true;
          this.dataStoreService
            .deleteDeployedInstance(idReservation, this.idMec)
            .subscribe(() => { this.getDeployedInstances(); });
          this.deleteTopic(topic, this.xUserInfo);
        }
      })
  }

  private deleteTopic (topicName: string, idReservation: string) {
    for (let topic of this.topics) {
      this.dataStoreService.deleteTopic(topicName, idReservation).subscribe();
    }
  }

  public reserveSla (reservation: any) {
    this.isLoading = true;
    let data = {
      username: this.currentUser,
      datatype: this.dataType,
      instance_type: reservation.type_name
    };
    this.dataStoreService
      .saveReservation(this.idMec, data)
      .subscribe(reservation => {
        this.reserveTopic(reservation.instance_id);
      });
    this.hasSubscribed = true;
  }

  public showTopic () {
    this.dialog.open(TopicDialogComponent, {
      width: '800px'
      // data: { idReservation: idReservation, idMec: this.idMec }
    });
  }

  private reserveTopic (instanceID: string) {
    this.toastr.success('Subscription confirmed ');
    this.dataStoreService
      .reserverTopic(this.tile, this.dataType, this.chosenInstanceType, this.xUserInfo)
      .subscribe({
        next: result => {
          this.getDeployedInstances();
          this.isLoading = true;
        },
        error: msg => {
          this.isLoading = true;
        }
      });
  }

  copy (text: string) {
    this.clipboard.copy(text);
  }

  private getDeployedInstances () {
    this.deployedInstances$ = this.dataStoreService.getDeployedInstances(this.idMec);
    this.isLoading = false;
  }

  // -- update breadcrumbs
  updateBreadcrumbs () {
    const mapParams = this.activeRoute.snapshot.paramMap;
    const tile = mapParams.get('tile') ?? '';

    this.breadcrumbService.set('@home', '/home');
    this.breadcrumbService.set('@datacatalogue', '/datacatalogue');
    this.breadcrumbService.set('@datatype', `/tile/${tile}`);
    this.breadcrumbService.set('@subtype', '');
  }
}
