import { Component, Inject, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Sla } from '@shared/interfaces/sla';
import { DataStoreService } from '../datastore/services/datastore.service';

@Component({
    selector: 'app-topics-list',
    templateUrl: './topics-list.component.html',
    styleUrls: ['./topics-list.component.scss'],
    standalone: false
})
export class TopicsListComponent implements OnInit {

  hasSubscribed: boolean;
  instanceTypes: Sla[];

  constructor(
    private clipboard: Clipboard,
    private dataStoreService: DataStoreService,
  ) { }

  ngOnInit(): void {
    this.hasSubscribed = true;
  }

  copy(text: string) {
    this.clipboard.copy(text);
  }

  /*TODO

  Manage mapping between deployed instances and 

  */

}
