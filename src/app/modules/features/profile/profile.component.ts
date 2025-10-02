import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { KeycloakClientAutheService } from '@core/guards/keycloak-client-auth.service';
import { users } from '../datastore/models/users';
import { AppServiceService } from './appService/app-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: false
})
export class ProfileComponent implements OnInit {
  @ViewChild('productsForm') from: NgForm;
  @ViewChild('userForm') form: NgForm;
  isLoggedIn = false;
  firstName = '';
  lastName = '';
  email = '';

  username = '';
  data = [];
  elt = {
    username: '',
    mail: '',
    first_name: '',
    last_name: '',
    contact: '',
    creation_date: Date,
    payment_intel: '',
    image: '',
    isEdit: false,
    isDelete: false,
    isEditProfilePicture: false
  };

  currentUserId: any;
  constructor (
    public auth: KeycloakClientAutheService,
    public appService: AppServiceService,
    private snackBar: MatSnackBar,
    // TODO Mettre en place la confirmService
    // private confirmService: NgConfirmService,
    private ngxUiLoader: NgxUiLoaderService,
    public keycloakService: KeycloakClientAutheService
  ) { }

  async ngOnInit () {
    // this.ngxUiLoader.start();
    const isLoggin = await this.keycloakService.isLoggedIn();
    this.isLoggedIn = await this.auth.isLoggedIn();
    if (isLoggin) {
      const { username, firstName, lastName, email } = (await this.keycloakService.loadUserProfile()) ?? '';
      this.firstName = firstName ?? '';
      this.lastName = lastName ?? '';
      this.email = email ?? '';
      this.username = this.keycloakService.getUserName();
      // this.ngxUiLoader.stop();
    }
  }

  onEditCliked (username: any) {
    this.currentUserId = username;
    // convert to text box to edit info
    this.elt.isEdit = true;
  }

  onEditProfilePicture (username: any) {
    this.currentUserId = username;
    this.elt.isEditProfilePicture = true;
  }

  onChangePassword () {
    window.location.href =
      'http://5gmeta-platform.eu/identity/realms/5gmeta/login-actions/reset-credentials?client_id=5gmeta_login&tab_id=Kn9Vcbmf4gQ';
  }
}
