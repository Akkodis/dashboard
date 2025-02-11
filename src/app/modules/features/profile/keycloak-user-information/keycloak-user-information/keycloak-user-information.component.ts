import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { InputHandler } from 'concurrently';

@Component({
  selector: 'app-keycloak-user-information',
  templateUrl: './keycloak-user-information.component.html',
  styleUrls: ['./keycloak-user-information.component.scss']
})
export class KeycloakUserInformationComponent implements OnInit {
  @Input() userName: string;
  @Input() email: string;
  @Input() firstName: string;
  @Input() lastName: string;

  formGroup = this.fb.group({
    email: null,
    userName: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
  });

  hasUnitNumber = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }

  onSubmit() {

  }
}
