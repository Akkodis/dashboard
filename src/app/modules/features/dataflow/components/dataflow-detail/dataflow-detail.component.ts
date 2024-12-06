import { KeycloakClientAutheService } from '@core/guards/keycloak-client-auth.service';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { DataStoreService } from 'app/modules/features/datastore/services/datastore.service';
import { dataFlowData } from 'app/modules/features/datastore/models/dataflow-data.model';
import { DataflowDialogComponent } from './dataflow-dialog/dataflow-dialog.component';
import { TopicDialogComponent } from './topic-dialog/topic-dialog.component';
import { Reservation } from '@shared/interfaces/reservation';
import { Sla } from '@shared/interfaces/sla';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dataflow-detail',
  templateUrl: './dataflow-detail.component.html',
  styleUrls: ['./dataflow-detail.component.scss']
})
export class DataflowDetailComponent implements OnInit {
  dataFlow$: Observable<dataFlowData>;
  reservationId$: Observable<Reservation>;
  topicName$: Observable<any>;
  listSla$: Observable<Sla[]>;
  reservationsData$: Observable<Reservation[]>;
  topicCount$: Observable<any>;
  tile: string;
  idMec: string;
  dataFlowId: number;
  topicName: string;
  selectedId: number;
  dataType: string;
  panelOpenState = false;
  isLoading = true;
  X_userInfo: '';

  constructor(
    private activeRoute: ActivatedRoute,
    private dataStoreService: DataStoreService,
    private keycloakClientAutheService: KeycloakClientAutheService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService
  ) {
    this.X_userInfo = this.keycloakClientAutheService['auth']['_userProfile']['id'];
  }

  ngOnInit() {
    // -- update Breadcrumbs
    this.updateBreadcrumbs();

    this.dataFlow$ = this.activeRoute.paramMap.pipe(
      switchMap(params => {
        this.tile = params.get('tile') ?? '';
        this.dataType = params.get('datatype') ?? '';
        this.idMec = params.get('idMec') ?? '';
        this.selectedId = Number(params.get('id'));

        this.getReservation();
        return this.dataStoreService.getDataFlowById(this.selectedId);
      })
    );
    this.dataFlow$.subscribe(data => {
      this.dataFlowId = data.dataFlowId;
    });
  }

  subscribe() {
    this.listSla$ = this.dataStoreService.getInstanceTypes(this.idMec).pipe(
      map((data: Sla[]) => {
        return data
          .sort((a, b) => a.type_name.localeCompare(b.type_name))
          .reverse();
      })
    );

    const dialogRef = this.dialog.open(DataflowDialogComponent, {
      width: '550px',
      data: { listSla: this.listSla$ }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (
          confirm(
            'Confirm subscription with ' + result.type_name + ' instance type'
          )
        ) {
          this.reserveSla(result);
        }
      }
    });
  }

  public deleteReservation(idReservation: string, level: string) {
    if (
      confirm(
        'Confirm subscription cancellation for dataflow ID: ' +
        this.dataFlowId +
        ' with instance type: ' +
        level
      )
    ) {
      this.isLoading = true;
      this.dataStoreService
        .deleteDeployedInstance(idReservation, this.idMec)
        .subscribe(() => {
          this.getReservation();
        });
      this.deleteTopic(this.topicName, idReservation);
    }
  }

  private deleteTopic(topicName: string, idReservation: string) {
    this.dataStoreService.deleteTopic(topicName, idReservation).subscribe();
  }

  public reserveSla(reservation: any) {
    this.isLoading = true;
    const data = {
      username: this.keycloakClientAutheService.getUserName(),
      X_userInfo: this.X_userInfo,
      datatype: this.dataType,
      instance_type: reservation.type_name
    };
    this.dataStoreService
      .saveReservation(this.idMec, data)
      .subscribe(reservation => {
        this.reserveTopic(reservation.instance_id);
      });
  }

  public showTopic(idReservation: string) {
    this.dialog.open(TopicDialogComponent, {
      width: '700px',
      data: { idReservation: idReservation, idMec: this.idMec }
    });
  }

  private reserveTopic(idReservation: string) {
    this.dataStoreService
      .reserverTopic(this.tile, this.dataType, this.X_userInfo, '')
      .subscribe({
        next: resulat => {
        },
        error: msg => {
          this.toastr.success('Subscription confirmed ')
          this.topicName = msg.error.text;
          this.getReservation();
        }
      });
  }

  private getReservation() {
    this.reservationsData$ = this.dataStoreService.getDeployedInstances(
      this.idMec
    );
    this.isLoading = false;
  }

  // -- update breadcrumbs
  updateBreadcrumbs() {
    // -- extract mapParams from router
    const mapParams = this.activeRoute.snapshot.paramMap;
    const tile = mapParams.get('tile') ?? undefined;
    const datatype = mapParams.get('datatype') ?? undefined;
    const subtype = mapParams.get('subtype') ?? undefined;
    const idMec = mapParams.get('idMec') ?? undefined;

    // -- update breadcrumb
    const breadcrumbs = [
      { label: 'Home', url: '/home' },
      { label: 'Data catalogue', url: '/datacatalogue' },
      { label: 'Datatype', url: '/tile/' + tile },
      { label: 'Subtype', url: '/tile/' + tile + '/datatype/' + datatype },
      { label: 'Dataflow', url: '/tile/' + tile + '/datatype/' + datatype + '/dataflow/' + subtype + '/' + idMec },
      { label: 'Dataflow details', url: '' }
    ]
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
}
