import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Router } from '@angular/router'
import { KeycloakClientAutheService } from '@core/guards/keycloak-client-auth.service';
import { ScreenService } from '@core/services/screen.service'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleMenu = new EventEmitter();

  firstname = '';
  lastname = '';
  username = '';
  constructor(
    private router: Router,
    public screenService: ScreenService,
    public keycloakService: KeycloakClientAutheService) { }

  async ngOnInit() {
    const isLoggin = await this.keycloakService.isLoggedIn();
    if (isLoggin) {
      const { firstName, lastName } = await this.keycloakService.loadUserProfile() ?? '';
      this.firstname = firstName ?? '';
      this.lastname = lastName ?? '';
      this.username = this.keycloakService.getUserName();
    }
  }

  public logout() {
    this.keycloakService.logout();
    this.router.navigate(['/']);
  }

  public onProfile() {
    this.router.navigate(['profile'])
  }

  onHelp() {
  }
}
