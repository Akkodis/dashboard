import { DataStoreService } from 'app/modules/features/datastore/services/datastore.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { Clipboard } from '@angular/cdk/clipboard';
import { TopicDetailComponent } from 'app/modules/features/topic-detail/topic-detail.component';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NavigationService } from '@core/services/navigation.service';
import { KeycloakClientAutheService } from '@core/guards/keycloak-client-auth.service';
import { DialogService } from '@core/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-topic-dialog',
  templateUrl: './topic-dialog.component.html',
  styleUrls: ['./topic-dialog.component.scss']
})
export class TopicDialogComponent implements OnInit {
  topicData$: Observable<any>;
  isAllChecked: boolean;
  @Input() topicDialogInModale = true;
  topicData: any[];
  selectedTopics: any[] = [];
  X_userInfo: '';

  constructor(
    public dialogRef: MatDialogRef<TopicDialogComponent>,
    private dataStoreService: DataStoreService,
    private navigation: NavigationService,
    private keycloakClientAutheService: KeycloakClientAutheService,
    private dialogService: DialogService,
    private ngxUiLoader: NgxUiLoaderService,
    private toastr: ToastrService,
    private clipboard: Clipboard,
    private route: Router,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.X_userInfo = this.keycloakClientAutheService['auth']['_userProfile']['id'];
  }

  ngOnInit(): void {
    this.ngxUiLoader.start()
    this.topicData$ = this.dataStoreService.getAllTopics(this.X_userInfo);
    this.topicData$.subscribe(data => {
      this.topicData = data;
      this.ngxUiLoader.stop();
    }, error => {
      this.ngxUiLoader.stop();
    })
  }

  copy(text: string) {
    this.clipboard.copy(text);
  }

  delete(text: any, X_Userinfo: string) {

    this.dialogService.openConfirmDialog(`Confirm delete topic  ` + text, '')
      .afterClosed().subscribe(resp => {
        if (resp) {
          this.dataStoreService.deleteTopic(text, X_Userinfo).subscribe(resp => {
          })
          let topicIndex = this.topicData.indexOf(text)
          this.topicData.splice(topicIndex, 1);
          this.topicData$ = of(this.topicData);
          this.toastr.success(' Topic deleted successfully.')
        }
      })
  }

  deleteSelected() {

    this.dialogService.openConfirmDialog(`Confirm delete All selected topic  `, '')
      .afterClosed().subscribe(resp => {
        if (resp) {
          this.selectedTopics.forEach(tp => {
            this.dataStoreService.deleteTopic(tp, this.X_userInfo).subscribe(resp => {
            })
            let topicIndex = this.topicData.indexOf(tp);
            this.topicData.splice(topicIndex, 1);
          })
          this.topicData$ = of(this.topicData);
          this.toastr.success(' Selected topics deleted successfully.')

        }
      })

  }
  checkUncheckAll() {
    this.isAllChecked = !this.isAllChecked;
  }

  detailTopic(data: any) {
    this.openModal(0, data, TopicDetailComponent)
  }
  monitoring(topic: any) {
    this.dialog.closeAll()
    this.route.navigate(['/monitoring', topic])
  }
  openModal(code: any, title: any, component: any) {
    var _popup = this.dialog.open(component, {
      width: '40%',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '500ms',
      data: {
        title: title,
        code: code
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.loadTopic(item)
    })

  }
  loadTopic(item: any) {

  }



  toggle(topic: any, event: MatCheckboxChange) {
    if (event.checked) {
      this.selectedTopics.push(topic);
    } else {
      const index = this.selectedTopics.indexOf(topic);
      if (index >= 0) {
        this.selectedTopics.splice(index, 1);
      }
    }
  }

  exists(topic: any) {
    return this.selectedTopics.indexOf(topic) > -1;
  };

  isIndeterminate() {
    return (this.selectedTopics.length > 0 && !this.isChecked());
  };

  isChecked() {
    if (this.topicData) {
      return this.selectedTopics.length === this.topicData.length;
    }
    return null;

  };



  toggleAll(event: MatCheckboxChange) {

    if (event.checked) {
      this.topicData.forEach((topic: any) => {
        this.selectedTopics.push(topic)
      });
    } else {
      this.selectedTopics.length = 0;
    }
  }

  cancel() {
    this.navigation.back()
  }


}
