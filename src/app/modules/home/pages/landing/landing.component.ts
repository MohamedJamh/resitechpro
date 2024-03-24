import {Component, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyTypeEnum} from "../../../../shared/enums/property-type.enum";
import {NzModalService} from "ng-zorro-antd/modal";
import {Property} from "../../../../shared/models/iproerpty.model";
import {Image} from "../../../../shared/models/iimage.model";
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
styleUrls: ['./landing.component.css']

})
export class LandingComponent implements OnInit {
  dotPosition: string = 'right';
  memberList = [
    {
      name: 'Erin Gonzales',
      img: 'assets/images/avatars/thumb-2.jpg',
      mail: 'erin.gon@gmail.com'
    },
    {
      name: 'Darryl Day',
      img: 'assets/images/avatars/thumb-3.jpg',
      mail: 'darryl.d@gmail.com'
    },
    {
      name: 'Marshall Nichols',
      img: 'assets/images/avatars/thumb-1.jpg',
      mail: 'marshalln@gmail.com'
    },
    {
      name: 'Virgil Gonzales',
      img: 'assets/images/avatars/thumb-4.jpg',
      mail: 'virgil14@gmail.com'
    }
  ]
  brandList = [
    {
      img: 'assets/images/brand/brand-logo1.png'
    },
    {
      img: 'assets/images/brand/brand-logo2.png'
    },
    {
      img: 'assets/images/brand/brand-logo3.png'
    },
    {
      img: 'assets/images/brand/brand-logo4.png'
    },
    {
      img: 'assets/images/brand/brand-logo5.png'
    },
    {
      img: 'assets/images/brand/brand-logo6.png'
    }
  ];
  PropertyTypes: PropertyTypeEnum[] = [
    PropertyTypeEnum.APARTMENT,
    PropertyTypeEnum.HOUSE,
    PropertyTypeEnum.OFFICE,
    PropertyTypeEnum.GARAGE,
    PropertyTypeEnum.SHOP
  ];
  moroccanCities: string[] = [
    "Casablanca, Morocco",
    "Fez, Morocco",
    "Tangier, Morocco",
    "Marrakech, Morocco",
    "Rabat, Morocco",
    "Meknes, Morocco",
    "Agadir, Morocco",
    "Oujda, Morocco",
    "Kenitra, Morocco",
    "Tetouan, Morocco"
  ];
  searchEffected: boolean = false;
  searchFormGroup: FormGroup;
  properties : Property[] = [];
  loadingProperties: boolean = true;
  propertyToShow: Property;
  isModalVisible: boolean;

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      city: ['all', [Validators.required]],
      propertyType: ['all', [Validators.required]]
    })
  }


  searchForProperties() {
    for (const i in this.searchFormGroup.controls) {
      this.searchFormGroup.controls[ i ].markAsDirty();
      this.searchFormGroup.controls[ i ].updateValueAndValidity();
    }
    if(this.searchFormGroup.invalid) return;

    alert('Search for properties')
    this.searchEffected = true;
  }

  getDefaultOrFirstImage(images: Image[],entity : string): string {
    if(images.length > 0) {
      return images[0].url;
    }
    switch (entity) {
      case "property":
        return '../../../../../assets/images/residences/res1.jpg';
      case "user":{
        return "../../../../../assets/images/avatars/thumb-4.jpg";
      }
    }
  }

  expandModal(property: Property) {
    this.propertyToShow = property;
    this.isModalVisible = true;
  }

  handleCancel() {

  }

  handleOk() {

  }
}
