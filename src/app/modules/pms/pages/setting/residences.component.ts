import { Component } from '@angular/core';
import {NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs} from 'ng-zorro-antd/upload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import {Residence} from "../../../../shared/models/iresidence.model";
import {Image} from "../../../../shared/models/iimage.model";
import {ResidenceService} from "../../../../shared/services/core/residence.service";
import {of} from "rxjs";
@Component({
    templateUrl: './residences.component.html'
})

export class ResidencesComponent {

    addResidenceForm: FormGroup;
    avatarUrl: string = "http://www.themenate.net/applicator/dist/assets/images/avatars/thumb-13.jpg";
    residences : Residence[] = [
        {
            "id": "ç_èqsdf_çqèsdf_èqsdfàçqsdf",
            "label": "Res 1",
            "description": "Jelly-o sesame snaps halvah croissant oat cake cookie. Cheesecake bear claw topping. Chupa chups apple pie carrot cake chocolate cake caramels",
            "location": "Agadir, Morocco",
            "surface": 120,
            "longitude": -9.598107,
            "latitude": 30.426664,
            "images": [
              {
                "url": "../../../../assets/images/others/default-residence.jpg"
              },{
                "url": "../../../../assets/images/others/default-residence.jpg"
              },{
                  "url": "https://resitechbucket.s3.eu-north-1.amazonaws.com/1710495305748_happyfish.png"
                }
            ] ,
        },
        // {
        //     "title": "You Should Know About Enlink",
        //     "image": "assets/images/others/img-2.jpg",
        //     "date": "Jan 2, 2019",
        //     "desc": "Jelly-o sesame snaps halvah croissant oat cake cookie. Cheesecake bear claw topping. Chupa chups apple pie carrot cake chocolate cake caramels",
        //     "authorName": "Darryl Day",
        //     "authorImg": "assets/images/avatars/thumb-2.jpg"
        // },
        // {
        //     "title": "Enlink Has The Answer",
        //     "image": "assets/images/others/img-3.jpg",
        //     "date": "Jan 2, 2019",
        //     "desc": "Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar.",
        //     "authorName": "Marshall Nichols",
        //     "authorImg": "assets/images/avatars/thumb-3.jpg"
        // },
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
    residenceToShow: Residence;
    loadingResidences: boolean = true;
    isModalVisible: boolean = false;

    constructor(
        private fb: FormBuilder,
        private modalService: NzModalService,
        private message: NzMessageService,
        private residenceService: ResidenceService
    ) {
        setTimeout(() => {
            this.loadingResidences = false;
        }, 1000);
    }

    ngOnInit(): void {
        this.addResidenceForm = this.fb.group({
          label: [null, [Validators.required]],
          description: [null, [Validators.required]],
          location: [null, [Validators.required]],
          latitude: [null, [Validators.required]],
          longitude: [null, [Validators.required]],
          surface: [null, [Validators.required]],
        })
        this.residenceService.getAllResidences().subscribe((response) => {
          if( [200].includes(response.status) && response.body?.result){
            this.residences = response.body.result;
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
            this.residences.push(response.body.result);
          }
        })

    }

    private getBase64(img: File, callback: (img: {}) => void): void {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange(event : Event): void {
      const input = event.target as HTMLInputElement;
        const formData = new FormData();
        formData.append('file', input.files[0], input.files[0].name);
        this.residenceService.uploadImage(formData, this.residenceToShow.id).subscribe((response) => {
          if([200].includes(response.status) && response.body.result){
            if(response.body.result == true) alert('Image uploaded successfully')
            else alert('Image upload failed')
          }
        })
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
    getDefaultOrFirstImage(images: Image[]): string {
        if(images.length > 0) {
            return images[0].url;
        }
        return "../../../../assets/images/others/default-residence.jpg";
    }
    onChooseLocation(event: any) {
      this.addResidenceForm.get('latitude').setValue(event['coords'].lat);
      this.addResidenceForm.get('longitude').setValue(event['coords'].lng);
      // this.addResidenceForm.get('latitude').disable()
      // this.addResidenceForm.get('longitude').disable()
    }
}
