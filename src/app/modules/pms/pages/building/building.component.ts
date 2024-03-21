import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import {Residence} from "../../../../shared/models/iresidence.model";
import {Image} from "../../../../shared/models/iimage.model";
import {ResidenceService} from "../../../../shared/services/core/residence.service";
import {Building} from "../../../../shared/models/ibuilding.model";
import {BuildingService} from "../../../../shared/services/core/building.service";

@Component({
    templateUrl: './building.component.html'
})

export class BuildingComponent {
    addBuildingForm: FormGroup;
    buildings : Building[] = [];
    buildingToShow: Building;
    residences: Residence[] = [];
    loadingBuildings: boolean = true;
    isModalVisible: boolean = false;
    addMapLat = null;
    addMapLng = null;

    constructor(
        private fb: FormBuilder,
        private modalService: NzModalService,
        private message: NzMessageService,
        private buildingService: BuildingService,
        private residenceService: ResidenceService
    ) {}

    ngOnInit(): void {
        this.addBuildingForm = this.fb.group({
          label: [null, [Validators.required]],
          description: [null, [Validators.required]],
          numberFloors: [null, [Validators.required]],
          residenceLabel: [null, [Validators.required]]
        })

      this.fetchBuildings();
      this.fetchResidences();

      this.addBuildingForm.controls['residenceLabel'].valueChanges.subscribe((value) => {
        this.residences.map((residence) => {
          if (residence.label == value) {
            this.addMapLat = residence.latitude;
            this.addMapLng = residence.longitude;
          }
        })
      })
    }

    fetchBuildings() {
      this.buildingService.getAllBuildings().subscribe((response) => {
        if( [200].includes(response.status) && response.body?.result){
          this.buildings = response.body.result;
          this.loadingBuildings = false;
        }
      })
    }
    fetchResidences() {
      this.residenceService.getAllResidences().subscribe((response) => {
        if( [200].includes(response.status) && response.body?.result){
          this.residences = response.body.result;
        }
      })
    }


    submitForm(): void {
        for (const i in this.addBuildingForm.controls) {
            this.addBuildingForm.controls[ i ].markAsDirty();
            this.addBuildingForm.controls[ i ].updateValueAndValidity();
        }
        if(this.addBuildingForm.invalid) return;

        this.buildingService.createBuilding(this.addBuildingForm.value).subscribe((response) => {
          if( [200,201].includes(response.status) && response.body?.result){
            this.message.success('Building created successfully');
            this.fetchBuildings();
          }
        })
        this.addBuildingForm.reset();

    }
    handleChange(event : Event): void {
      const input = event.target as HTMLInputElement;
        const formData = new FormData();
        formData.append('file', input.files[0], input.files[0].name);
        this.buildingService.uploadImage(formData, this.buildingToShow.id).subscribe((response) => {
          if([200].includes(response.status) && response.body.result){
            if(response.body.result == true){
              this.message.success('Image uploaded successfully');
              this.fetchBuildings();
            }
            else this.message.error('Image not uploaded');
          }
        })
      this.handleCancel()
    }

    handleOk() {
        this.isModalVisible = false;
        this.buildingToShow = null;
    }

    expandModal(building: Building) {
        this.buildingToShow = building;
        this.isModalVisible = true;
    }
    handleCancel() {
        this.isModalVisible = false;
        this.buildingToShow = null;
    }
    getDefaultOrFirstImage(images: Image[],entity : string): string {
        if(images.length > 0) {
            return images[0].url;
        }
        switch (entity) {
            case "building":
                return '../../../../../assets/images/residences/res1.jpg';
            case "user":{
                return "../../../../../assets/images/avatars/thumb-4.jpg";
            }
        }
    }

}
