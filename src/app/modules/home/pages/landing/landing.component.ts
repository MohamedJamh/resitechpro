import {Component, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyTypeEnum} from "../../../../shared/enums/property-type.enum";
import {NzModalService} from "ng-zorro-antd/modal";
import {Property} from "../../../../shared/models/iproerpty.model";
import {Image} from "../../../../shared/models/iimage.model";
import {ShowcaseService} from "../../../../shared/services/core/showcase.service";
import {User} from "../../../../shared/models/iuser.model";
import {AuthService} from "../../../../shared/services/core/auth.service";
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
styleUrls: ['./landing.component.css']

})
export class LandingComponent implements OnInit {
  dotPosition: string = 'right';
  partnersList : User[] = []
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
  userPictures: string[] = [
    '../../../../../assets/images/avatars/thumb-1.jpg',
    '../../../../../assets/images/avatars/thumb-2.jpg',
    '../../../../../assets/images/avatars/thumb-3.jpg',
    '../../../../../assets/images/avatars/thumb-4.jpg',
  ]

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private showCaseService: ShowcaseService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      location: ['all', [Validators.required]],
      propertyType: ['all', [Validators.required]]
    })
    this.fetchAllProperties();
    this.fetchAllPartners();

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

  fetchAllPartners() {
    this.showCaseService.getAllPartners().subscribe((response) => {
        if( [200].includes(response.status) && response.body.result){
          this.partnersList = response.body.result;
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
    else if(object.location != 'all' && object.propertyType != 'all') {
      this.showCaseService.searchProperties({location: object.location, propertyType: object.propertyType}).subscribe((response) => {
        if ([200].includes(response.status) && response.body.result) {
          this.loadingProperties = false;
          this.properties = response.body.result;
        }
      })
    }
    else if(object.propertyType !== 'all') {
       this.showCaseService.searchProperties({propertyType: object.propertyType}).subscribe((response) => {
         if ([200].includes(response.status) && response.body.result) {
           this.loadingProperties = false;
           this.properties = response.body.result;
         }
       })
     }
     else if(object.location !== 'all'){
        this.showCaseService.searchProperties({location: object.location}).subscribe((response) => {
          if( [200].includes(response.status) && response.body.result){
            this.loadingProperties = false;
            this.properties = response.body.result;
          }
        })
     }
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

  getRandomUserPicture() : string {
    return '../../../../../assets/images/avatars/thumb-4.jpg';
  }
}
