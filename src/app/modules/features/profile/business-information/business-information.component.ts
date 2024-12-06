import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { Commercials } from '../../../../../../mocks/mock-commercial-option';
import { Option } from '../../../../shared/interfaces/Option';
import { Geolimits } from '../../../../../../mocks/mock-geolimit-option';
import { AppServiceService } from '../appService/app-service.service';
import { Router } from '@angular/router';
import { KeycloakClientAutheService } from '@core/guards/keycloak-client-auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-business-information',
  templateUrl: './business-information.component.html',
  styleUrls: ['./business-information.component.scss']
})
export class BusinessInformationComponent implements OnInit {

  public commercialOptions = Commercials;
  public geolimitOptions = Geolimits;
  currentGeoLimitOptionsSelected: any;
  selectdeselectAllLabelCommercialOptions: string = '';
  selectdeselectAllLabelGeolimitOptions: string = '';
  currentCommercialOptionsSelected: any;
  refCommercialSelectedOption: Option[] = Commercials;
  refGeolimitSelectedOption: Option[] = Geolimits;

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  formData: any;
  currentUserId: any;
  formulaireCaption: string = '';

  constructor(private formBuilder: FormBuilder,
    private appService: AppServiceService,
    private router: Router,
    private toastr: ToastrService,
    private ngxUiLoader: NgxUiLoaderService,
    private auth: KeycloakClientAutheService) {
    this.currentUserId = localStorage.getItem('currentUserId') || '{}';
    this.auth.loadUserProfile().then(data => {
      this.currentUserId = data.id || '';
      localStorage.setItem('currentUserId', this.currentUserId);
    });
  }

  ngOnInit() {
    this.ngxUiLoader.start();
    setTimeout(() => {
      this.appService.getBusinessInfoById(this.currentUserId).subscribe(data => {
        if (data != null) {
          this.geolimitOptions = data['preferredLicense']['geolimits'];
          this.commercialOptions = data['preferredLicense']['commercials'];
          let geolimitOptionSize = this.geolimitOptions.length;
          let commercialOptionSize = this.commercialOptions.length;
          let geoLimitOptionsSelected: any[] = [];
          let commercialOptionsSelected: any[] = [];
          for (let i = 0; i < geolimitOptionSize; i++) {
            let current: any = this.refGeolimitSelectedOption.filter(elemt => elemt.label == String(this.geolimitOptions[i]));
            geoLimitOptionsSelected.push(current[0])
          }
          this.currentGeoLimitOptionsSelected = geoLimitOptionsSelected;

          for (let i = 0; i < commercialOptionSize; i++) {
            let current: any = this.refCommercialSelectedOption.filter(elemt => elemt.label == String(this.commercialOptions[i]));
            commercialOptionsSelected.push(current[0])
          }
          this.currentGeoLimitOptionsSelected = geoLimitOptionsSelected;
          this.currentCommercialOptionsSelected = commercialOptionsSelected;
          this.selectdeselectAllLabelGeolimitOptions = this.currentGeoLimitOptionsSelected.length == this.refGeolimitSelectedOption.length ? 'Deselect all' : 'Select all';
          this.selectdeselectAllLabelCommercialOptions = this.currentCommercialOptionsSelected.length == this.refCommercialSelectedOption.length ? 'Deselect all' : 'Select all';

          this.formData = data;
          this.formulaireCaption = "Update"
        } else {
          this.formulaireCaption = "Save"
        }
      })
      this.ngxUiLoader.stop();
    }, 1000)

    this.createForm();
    this.setChangeValidate()
    setTimeout(() => {
      this.formGroup.patchValue({
        streetNumber: this.formData?.address.streetNumber,
        street: this.formData?.address.street,
        city: this.formData?.address.city,
        postalCode: this.formData?.address.postalCode
      })

    }, 2500)
    setTimeout(() => {
    }, 2000)


  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      userId: [null, [Validators.required]],
      streetNumber: [null, [Validators.required]],
      street: [null, [Validators.required]],
      city: [null, Validators.required],
      postalCode: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5)
        ])
      ],
      geolimit: [null, [Validators.required]],
      commercial: [null, [Validators.required]]

    });
    this.formGroup.controls['userId'].setValue(this.currentUserId)

  }

  setChangeValidate() {
    // this.formGroup.get('validate').valueChanges.subscribe(
    //   (validate) => {
    //     if (validate == '1') {
    //       this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
    //       this.titleAlert = "You need to specify at least 3 characters";
    //     } else {
    //       this.formGroup.get('name').setValidators(Validators.required);
    //     }
    //     this.formGroup.get('name').updateValueAndValidity();
    //   }
    // )
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  // checkPassword(control: any) {
  //   let enteredPassword = control.value
  //   let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  //   return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  // }

  // checkInUseEmail(control: any) {
  //   // mimic http database access
  //   let db = ['jack@torchwood.com'];
  //   return new Observable(observer => {
  //     setTimeout(() => {
  //       let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
  //       observer.next(result);
  //       observer.complete();
  //     }, 4000)
  //   })
  // }

  getErrorUserId() {
    return null;
    // this.formGroup.get('email').hasError('required') ? 'Field is required' :
    //   this.formGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
    //     this.formGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorCommercial() {
    return null;
    // this.formGroup.get('password').hasError('required') ? 'Field is required (at least eight characters, one uppercase letter and one number)' :
    //   this.formGroup.get('password').hasError('requirements') ? 'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  onSubmit(formData: any) {
    let businessInfosData: {
      user_id: string;
      address: {
        addressID: string;
        streetNumber: string;
        street: string;
        city: string;
        postalCode: string;
      };
      preferredLicense: {
        preferredLicenseId: string;
        commercials: String[];
        geolimits: String[];
      };
    } = {
      "user_id": "",
      "address": {
        "addressID": "",
        "streetNumber": "",
        "street": "",
        "city": "",
        "postalCode": ""
      },
      "preferredLicense": {
        "preferredLicenseId": "",
        "commercials": [],
        "geolimits": []
      }
    }
    businessInfosData.user_id = ''

    businessInfosData.user_id = this.currentUserId;
    businessInfosData.address.addressID = this.currentUserId;
    businessInfosData.address.streetNumber = formData.streetNumber;
    businessInfosData.address.street = formData.street;
    businessInfosData.address.city = formData.city;
    businessInfosData.address.postalCode = formData.postalCode;
    businessInfosData.preferredLicense.preferredLicenseId = this.currentUserId;
    formData.commercial.forEach(element => {
      businessInfosData?.preferredLicense.commercials?.push(element['label']);
    });
    formData.geolimit.forEach(element => {
      businessInfosData?.preferredLicense.geolimits?.push(element['label']);
    })

    this.appService.addBusinessInfo(businessInfosData).subscribe(data => {
      this.toastr.success('Saved Successfully ')
      this.router.navigateByUrl(('/home'));
    })

    this.formData = formData;
  }
  closeform() {
    this.router.navigateByUrl(('/home'));

  }

}
