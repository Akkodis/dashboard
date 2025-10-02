import { Component } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TopicDialogComponent } from '../dataflow/components/dataflow-detail/topic-dialog/topic-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-manage-subscription',
  templateUrl: './manage-subscription.component.html',
  styleUrls: ['./manage-subscription.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    TopicDialogComponent
  ]
})
export class ManageSubscriptionComponent {

}
