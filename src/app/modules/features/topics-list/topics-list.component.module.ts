import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";
import { DirectivesModule } from "app/modules/directives/directives.module";
import { TopicsListComponent } from "./topics-list.component";
import { TopicsListRoutingModule } from "./topics-list-routing.module";


@NgModule({
  declarations: [
    TopicsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DirectivesModule,
    ReactiveFormsModule,
    TopicsListRoutingModule
  ]
})
export class TopicsListModule { }
