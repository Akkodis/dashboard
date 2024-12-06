import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ScreenService } from './services/screen.service';

import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MaterialModule } from '@shared/material.module';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { NavSearchComponent } from '@core/components';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from './guards/ensure-module-loaded-once.guard';
import { DirectivesModule } from 'app/modules/directives/directives.module';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { NgDynamicBreadcrumbModule } from 'ng-dynamic-breadcrumb';

@NgModule({
  declarations: [
    MainLayoutComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    NavSearchComponent,
    AuthButtonComponent
  ],
  imports: [
    // HttpClientModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    DirectivesModule,
    NgDynamicBreadcrumbModule
  ],
  providers: [
    ScreenService
  ],
  exports: [
    MainLayoutComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    TranslateModule,
    NavSearchComponent
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
