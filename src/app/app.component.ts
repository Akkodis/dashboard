import { Component } from '@angular/core'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fivegmeta';
  public isExpanded = true;
  supportedLanguages = ['en', 'fr']
  constructor(private translateservice: TranslateService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    // Translation config
    this.translateservice.addLangs(this.supportedLanguages)
    this.translateservice.setDefaultLang('en')
    const browserlang = this.translateservice.getBrowserLang() ?? ''
    this.translateservice.use(browserlang)

    // custom icons to mat-icon library

    this.matIconRegistry.addSvgIcon('twitter', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/twitter.svg'))
  }

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}
