import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import {Residence} from "../../../../shared/models/iresidence.model";
import {Image} from "../../../../shared/models/iimage.model";
import {ResidenceService} from "../../../../shared/services/core/residence.service";
import {Building} from "../../../../shared/models/ibuilding.model";
import {BuildingService} from "../../../../shared/services/core/building.service";
import {Property} from "../../../../shared/models/iproerpty.model";
import {PropertyService} from "../../../../shared/services/core/property.service";
import {PropertyTypeEnum} from "../../../../shared/enums/property-type.enum";

@Component({
    templateUrl: './property.component.html'
})

export class PropertyComponent {
    addPropertyForm: FormGroup;
    properties : Property[] = [];
    propertyToShow: Property;
    buildings: Building[] = [];
    loadingProperties: boolean = true;
    isModalVisible: boolean = false;
    addMapLat = null;
    addMapLng = null;
    maxSurface: number = 1;
    maxFloorByBuilding: number = 1;
    PropertyTypes: PropertyTypeEnum[] = [
      PropertyTypeEnum.APARTMENT,
      PropertyTypeEnum.HOUSE,
      PropertyTypeEnum.OFFICE,
      PropertyTypeEnum.GARAGE,
      PropertyTypeEnum.SHOP
    ];

    constructor(
        private fb: FormBuilder,
        private modalService: NzModalService,
        private message: NzMessageService,
        private buildingService: BuildingService,
        private propertyService: PropertyService
    ) {}

    ngOnInit(): void {
        this.addPropertyForm = this.fb.group({
          label: [null, [Validators.required]],
          description: [null, [Validators.required]],
          propertyType: [null, [Validators.required]],
          buildingLabel: [null, [Validators.required]],
          surface: [null, [Validators.required]],
          numberRooms: [null],
          numberBathrooms: [null],
          numberBedrooms: [null],
          numberWindows: [null],
          floorNumber: [null, [Validators.required]],
          rentValue: [null, [Validators.required]],
        })

      this.fetchProperties();
      this.fetchBuildings();

      this.addPropertyForm.controls['buildingLabel'].valueChanges.subscribe((value) => {
        this.buildings.map((building) => {
          if (building.label == value) {
            this.addMapLat = building.residence.latitude;
            this.addMapLng = building.residence.longitude;
            this.maxSurface = building.residence.surface + 1;
            this.maxFloorByBuilding = building.numberFloors ;
          }
        })
      })
    }

    fetchProperties() {
      this.propertyService.getAllProperties().subscribe((response) => {
        if( [200].includes(response.status) && response.body?.result){
          this.properties = response.body.result;
          this.loadingProperties = false;
        }
      })
    }
    fetchBuildings() {
      this.buildingService.getAllBuildings().subscribe((response) => {
        if( [200].includes(response.status) && response.body?.result){
          this.buildings = response.body.result;
        }
      })
    }


    submitForm(): void {
        for (const i in this.addPropertyForm.controls) {
            this.addPropertyForm.controls[ i ].markAsDirty();
            this.addPropertyForm.controls[ i ].updateValueAndValidity();
        }
        if(this.addPropertyForm.invalid) return;

        this.propertyService.createProperty(this.addPropertyForm.value).subscribe((response) => {
          if( [200,201].includes(response.status) && response.body?.result){
            this.message.success('Property created successfully');
            this.fetchProperties();
          }
        })
        this.addPropertyForm.reset();

    }
    handleChange(event : Event): void {
      const input = event.target as HTMLInputElement;
        const formData = new FormData();
        formData.append('file', input.files[0], input.files[0].name);
        this.propertyService.uploadImage(formData, this.propertyToShow.id).subscribe((response) => {
          if([200].includes(response.status) && response.body.result){
            if(response.body.result == true){
              this.message.success('Image uploaded successfully');
              this.fetchProperties();
            }
            else this.message.error('Image not uploaded');
          }
        })
      this.handleCancel()
    }

    handleOk() {
        this.isModalVisible = false;
        this.propertyToShow = null;
    }

    expandModal(property: Property) {
        this.propertyToShow = property;
        this.isModalVisible = true;
    }
    handleCancel() {
        this.isModalVisible = false;
        this.propertyToShow = null;
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

  getMaxSurfaceByBuilding() : number {
    return undefined;
  }
}
