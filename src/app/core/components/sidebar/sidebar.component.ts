import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationService } from '@core/services/navigation.service';
import { RouteLink } from '@shared/interfaces/route-link';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false
})
export class SidebarComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() toggleMenu = new EventEmitter();
  constructor (private navigation: NavigationService) { }
  public routeLinks: RouteLink[] = [
    { link: 'back', name: 'Back', icon: 'arrow_back' },
    { link: 'home', name: 'Home', icon: 'home' },
    { link: 'datacatalogue', name: 'Data catalogue', icon: 'dashboard' },
    { link: 'manage-subscription', name: 'Subscriptions', icon: 'subscriptions' },
    // { link: 'topics', name: 'My topics', icon: 'topic' }
    // todo : hide link in sidebar menu for demo
    { link: 'monitoring', name: 'Monitoring', icon: 'legend_toggle' }
    /*
    { link: 'serviceapi', name: 'Services', icon: 'api' },
    { link: 'costmanagement', name: 'Cost Management', icon: 'account_balance' },
    { link: 'logs', name: 'Logs', icon: 'receipt_long' },
    { link: 'news', name: 'News', icon: 'info' }
    */
  ];

  ngOnInit (): void {
  }

  isBackClicked (clickedButton: string) {
    if (clickedButton == 'Back') {
      this.navigation.back()
    }
  }
}
