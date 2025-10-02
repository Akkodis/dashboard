import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DataStoreService } from '../datastore/services/datastore.service';
import {Clipboard, ClipboardModule} from '@angular/cdk/clipboard';
import {Router, RouterModule} from '@angular/router';
import { KeycloakClientAutheService } from '@core/guards/keycloak-client-auth.service';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-topic-dialog.module.ts',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss'],
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class TopicDetailComponent implements OnInit {
  inputData: any;
  topicData: any;
  X_userInfo = '';
  constructor (@Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<TopicDetailComponent>,
    private dataStoreService: DataStoreService,
    private keycloakClientAutheService: KeycloakClientAutheService,
    private clipboard: Clipboard,
    private route: Router) {
    this.X_userInfo = this.keycloakClientAutheService['auth']['_userProfile']['id'];
  }

  ngOnInit (): void {
    this.inputData = this.data;
    if (this.inputData.title.length > 0) {
      this.dataStoreService.getTopicByName(this.inputData.title, this.X_userInfo).subscribe(data => {
        this.topicData = data;
      })
    }
  }

  closeModale () {
    this.ref.close('closing from topic detail')
  }

  copy (text: string) {
    this.clipboard.copy(text);
  }

  delete (topic: any) {

  }

  monitoring (topic: any) {
    this.closeModale()
    this.route.navigate(['/monitoring'])
  }
}
