import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";
import { DirectivesModule } from "app/modules/directives/directives.module";
import { DataflowDetailComponent } from "./dataflow-detail/dataflow-detail.component";
import { DataFlowRoutingModule } from "./dataflow-routing.module";
import { DataFlowComponent } from "./dataflow.component";
import { DataflowDialogComponent } from './dataflow-detail/dataflow-dialog/dataflow-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { TopicDialogComponent } from "./dataflow-detail/topic-dialog/topic-dialog.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { DataflowSubtypeComponent } from "./dataflow-subtype/dataflow-subtype.component"
// import { MatConfirmDialogComponent } from "@shared/components/mat-confirm-dialog/mat-confirm-dialog.component";

@NgModule({
  declarations: [
    DataFlowComponent,
    DataflowDetailComponent,
    DataflowDialogComponent,
    TopicDialogComponent,
    DataflowSubtypeComponent,
    //  MatConfirmDialogComponent
  ],
  imports: [
    MatExpansionModule,
    MatDialogModule,
    CommonModule,
    DataFlowRoutingModule,
    SharedModule,
    DirectivesModule,
    ReactiveFormsModule
  ],
  exports: [
    TopicDialogComponent
  ]
})
export class DataFlowModule { }
