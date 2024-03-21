import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import {Residence} from "../../../../shared/models/iresidence.model";
import {Image} from "../../../../shared/models/iimage.model";
import {ResidenceService} from "../../../../shared/services/core/residence.service";

@Component({
    templateUrl: './residence.component.html'
})

export class ResidenceComponent {

    addResidenceForm: FormGroup;
    residences : Residence[] = [];
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
    residenceToShow: Residence;
    loadingResidences: boolean = true;
    isModalVisible: boolean = false;

    constructor(
        private fb: FormBuilder,
        private modalService: NzModalService,
        private message: NzMessageService,
        private residenceService: ResidenceService
    ) {}

    ngOnInit(): void {
        this.addResidenceForm = this.fb.group({
          label: [null, [Validators.required]],
          description: [null, [Validators.required]],
          location: [null, [Validators.required]],
          latitude: [null, [Validators.required]],
          longitude: [null, [Validators.required]],
          surface: [null, [Validators.required]],
        })

      this.fetchResidences();
    }

    fetchResidences() {
      this.residenceService.getAllResidences().subscribe((response) => {
        if( [200].includes(response.status) && response.body?.result){
          this.residences = response.body.result;
          this.loadingResidences = false;
        }
      })
    }


    submitForm(): void {
        for (const i in this.addResidenceForm.controls) {
            this.addResidenceForm.controls[ i ].markAsDirty();
            this.addResidenceForm.controls[ i ].updateValueAndValidity();
        }
        if(this.addResidenceForm.invalid) return;

        this.residenceService.createResidence(this.addResidenceForm.value).subscribe((response) => {
          if( [200,201].includes(response.status) && response.body?.result){
            this.message.success('Residence created successfully');
            this.fetchResidences();
          }
        })
        this.addResidenceForm.reset()
    }
    handleChange(event : Event): void {
      const input = event.target as HTMLInputElement;
        const formData = new FormData();
        formData.append('file', input.files[0], input.files[0].name);
        this.residenceService.uploadImage(formData, this.residenceToShow.id).subscribe((response) => {
          if([200].includes(response.status) && response.body.result){
            if(response.body.result == true){
              this.message.success('Image uploaded successfully');
              this.fetchResidences();
            }
            else this.message.error('Image not uploaded');
          }
        })
      this.handleCancel()
    }

    handleOk() {
        this.isModalVisible = false;
        this.residenceToShow = null;
    }

    expandModal(residence: Residence) {
        this.residenceToShow = residence;
        this.isModalVisible = true;
    }
    handleCancel() {
        this.isModalVisible = false;
        this.residenceToShow = null;
    }
    getDefaultOrFirstImage(images: Image[],entity : string): string {
        if(images.length > 0) {
            return images[0].url;
        }
        switch (entity) {
            case "residence":
                return '../../../../../assets/images/residences/res1.jpg';
            case "user":{
                return "../../../../../assets/images/avatars/thumb-4.jpg";
            }
        }
    }
    onChooseLocation(event: any) {
      this.addResidenceForm.get('latitude').setValue(event['coords'].lat);
      this.addResidenceForm.get('longitude').setValue(event['coords'].lng);
    }
}
