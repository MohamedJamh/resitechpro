import {Component, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyTypeEnum} from "../../../../shared/enums/property-type.enum";
import {NzModalService} from "ng-zorro-antd/modal";
import {Property} from "../../../../shared/models/iproerpty.model";
import {Image} from "../../../../shared/models/iimage.model";
import {ShowcaseService} from "../../../../shared/services/core/showcase.service";
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
  searchFormGroup: FormGroup;
  properties : Property[] = [];
  loadingProperties: boolean = true;
  propertyToShow: Property;
  isModalVisible: boolean;

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private showCaseService: ShowcaseService,
  ) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      location: ['all', [Validators.required]],
      propertyType: ['all', [Validators.required]]
    })
    this.fetchAllProperties();

  }

  fetchAllProperties() {
    this.showCaseService.getAllProperties().subscribe((response) => {
        if( [200].includes(response.status) && response.body.result){
          this.loadingProperties = false;
          this.properties = response.body.result;
        }
      }
    )
  }

  searchForProperties() {
    for (const i in this.searchFormGroup.controls) {
      this.searchFormGroup.controls[ i ].markAsDirty();
      this.searchFormGroup.controls[ i ].updateValueAndValidity();
    }
    if(this.searchFormGroup.invalid) return;

    let object = this.searchFormGroup.value;
     if(object.location === 'all' && object.propertyType === 'all') this.fetchAllProperties();
     if(object.location === 'all') {
       this.showCaseService.searchProperties({propertyType: object.propertyType}).subscribe((response) => {
         if ([200].includes(response.status) && response.body.result) {
           this.loadingProperties = false;
           this.properties = response.body.result;
         }
       })
     }
     if(object.propertyType === 'all'){
        this.showCaseService.searchProperties({location: object.location}).subscribe((response) => {
          if( [200].includes(response.status) && response.body.result){
            this.loadingProperties = false;
            this.properties = response.body.result;
          }
        })
     }
    console.log(this.properties)
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
    console.log(this.propertyToShow)
    this.isModalVisible = true;
  }

  handleCancel() {
    this.isModalVisible = false;
    this.propertyToShow = null;
  }

  handleOk() {
    this.isModalVisible = false;
    this.propertyToShow = null;
  }
}
