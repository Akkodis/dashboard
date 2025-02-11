import { AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { Reservation } from '@shared/interfaces/reservation';
import { Sla } from '@shared/interfaces/sla';
import { DataStoreService } from 'app/modules/features/datastore/services/datastore.service';
import { map, switchMap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { DataflowDialogComponent } from '../dataflow-detail/dataflow-dialog/dataflow-dialog.component';
import { TopicDialogComponent } from '../dataflow-detail/topic-dialog/topic-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakClientAutheService } from '@core/guards/keycloak-client-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { Clipboard } from '@angular/cdk/clipboard';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';
import { DialogService } from '@core/services/dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dataflow-subscription',
  templateUrl: './dataflow-subtype.component.html',
  styleUrls: ['./dataflow-subtype.component.scss']
})
export class DataflowSubtypeComponent implements OnInit, AfterViewChecked {
  dataflowIDs$: Observable<number[]>;
  topicName$: Observable<any>;
  topicName: string;
  // --- route params
  tile: string;
  datatype: string;
  subtype: string;
  idMec: string;
  //
  icon: string;
  selected: number;
  instanceTypes$: Observable<Sla[]>;
  // reservation$: Observable<Reservation>;
  deployedInstances$: Observable<Reservation[]>;
  isLoading = true;
  currentUser: string;
  hasSubscribed = false;
  chosenInstanceType: string;
  topics: string[];
  X_userInfo: '';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dataStoreService: DataStoreService,
    private keycloakClientAutheService: KeycloakClientAutheService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private clipboard: Clipboard,
    private ngDynamicBreadcrumbService: NgDynamicBreadcrumbService,
    private dialogService: DialogService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.currentUser = this.keycloakClientAutheService.getUserName();
    this.X_userInfo = this.keycloakClientAutheService['auth']['_userProfile']['id'];
  }
  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit() {
    // -- update Breadcrumbs
    this.updateBreadcrumbs();

    this.dataflowIDs$ = this.activeRoute.paramMap.pipe(
      switchMap((params) => {
        this.tile = params.get('tile') ?? '';
        this.datatype = params.get('datatype') ?? '';
        this.subtype = params.get('subtype') ?? '';
        this.idMec = params.get('idMec') ?? '';

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
          this.dataStoreService.getAllTopics(this.X_userInfo).subscribe(data => { this.topics = data; });
        })

        return this.dataStoreService.getDataflowIDs(this.tile, this.datatype, this.subtype);
      })
    );

    this.currentUser = this.keycloakClientAutheService.getUserName();
  }

  public getIcon() {
    return this.icon;
  }

  // --- navigate to next page
  onSelectCard(index: number) {
    this.router.navigate(['tile', this.tile, 'datatype', this.datatype, 'dataflow', this.subtype, this.idMec, 'detail', index]);
  }

  subscribe() {
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
        this.dialogService.openConfirmDialog(`Confirm subscription with ` + result.type_name, '')
          .afterClosed().subscribe(resp => {
            if (resp) {
              this.chosenInstanceType = result.type_name;
              this.reserveSla(result);
            }
          })
      }
    });
  }

  public deleteReservation(idReservation: string, topic: string) {
    if (
      confirm(
        'Confirm subscription cancellation for ' +
        topic + '?'
      )
    ) {
      this.isLoading = true;
      this.dataStoreService
        .deleteDeployedInstance(idReservation, this.idMec)
        .subscribe(() => {
          this.getDeployedInstances();
        });
      this.deleteTopic(topic, idReservation);
    }
  }

  public deleteTopics() {
    this.dialogService.openConfirmDialog('Delete all the topics?', '')
      .afterClosed().subscribe(resp => {
        if (resp) {
          this.dataStoreService.getDeployedInstances(this.idMec).subscribe(instances => {
            for (const instance of instances) {
              if (instance.username === this.currentUser) {
                this.dataStoreService.deleteDeployedInstance(instance.instance_id, this.idMec).subscribe();
              }
            }

            this.dataStoreService.getAllTopics(this.X_userInfo).subscribe(topics => {
              for (const topic of topics) {
                this.dataStoreService.deleteTopic(topic, this.idMec).subscribe();
              }
            })

            this.hasSubscribed = false;
          });

        }
      })
  }

  private deleteTopic(topicName: string, idReservation: string) {
    // for (const topic of this.topics) {
    this.dataStoreService.deleteTopic(topicName, idReservation).subscribe();
    //  }
  }

  public reserveSla(reservation: any) {
    this.isLoading = true;
    const data = {
      username: this.currentUser,
      datatype: this.datatype,
      instance_type: reservation.type_name
    };
    this.dataStoreService
      .saveReservation(this.idMec, data)
      .subscribe(reservation => {
        this.reserveTopic(reservation.instance_id);
      });
    this.hasSubscribed = true;
  }

  public showTopic() {
    this.dialog.open(TopicDialogComponent, {
      width: '700px'
      // data: { idReservation: idReservation, idMec: this.idMec }
    });
  }

  private reserveTopic(instanceID: string) {
    this.dataStoreService
      .reserverTopic(this.tile, this.datatype, this.chosenInstanceType, this.subtype)
      .subscribe({
        next: resulat => {
        },
        error: msg => {
          this.toastr.success('Subscription confirmed ')
          this.topicName = msg.error.text;
          this.topics.push(msg.error.text);
          this.getDeployedInstances();
        }
      });
  }

  private getDeployedInstances() {
    this.deployedInstances$ = this.dataStoreService.getDeployedInstances(this.idMec);
    this.isLoading = false;
  }

  copy(text: string) {
    this.clipboard.copy(text);
  }

  // -- update breadcrumbs
  updateBreadcrumbs() {
    // -- extract mapParams from router
    const mapParams = this.activeRoute.snapshot.paramMap;
    const tile = mapParams.get('tile') ?? undefined;
    const datatype = mapParams.get('datatype') ?? undefined;

    // -- update breadcrumb
    const breadcrumbs = [
      { label: 'Home', url: '/home' },
      { label: 'Data catalogue', url: '/datacatalogue' },
      { label: 'Datatype', url: '/tile/' + tile },
      { label: 'Subtype', url: '/tile/' + tile + '/datatype/' + datatype },
      { label: 'Dataflow', url: '' }
    ]
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }
}
