import { Component } from '@angular/core';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd/upload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import {Residence} from "../../../../shared/models/iresidence.model";
import {Image} from "../../../../shared/models/iimage.model";
@Component({
    templateUrl: './residences.component.html'
})

export class ResidencesComponent {

    addResidenceForm: FormGroup;
    avatarUrl: string = "http://www.themenate.net/applicator/dist/assets/images/avatars/thumb-13.jpg";
    selectedCountry: any;
    selectedLanguage: any;
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


    networkList = [
        {
            name: 'Facebook',
            icon: 'facebook',
            avatarColor: '#4267b1',
            avatarBg: 'rgba(66, 103, 177, 0.1)',
            status: true,
            link: 'https://facebook.com'
        },
        {
            name: 'Instagram',
            icon: 'instagram',
            avatarColor: '#fff',
            avatarBg: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)',
            status: false,
            link: 'https://instagram.com'
        },
        {
            name: 'Twitter',
            icon: 'twitter',
            avatarColor: '#1ca1f2',
            avatarBg: 'rgba(28, 161, 242, 0.1)',
            status: true,
            link: 'https://twitter.com'
        },
        {
            name: 'Dribbble',
            icon: 'dribbble',
            avatarColor: '#d8487e',
            avatarBg: 'rgba(216, 72, 126, 0.1)',
            status: false,
            link: 'https://dribbble.com'
        },
        {
            name: 'Github',
            icon: 'github',
            avatarColor: '#323131',
            avatarBg: 'rgba(50, 49, 49, 0.1)',
            status: true,
            link: 'https://github.com'
        },
        {
            name: 'Linkedin',
            icon: 'linkedin',
            avatarColor: '#0174af',
            avatarBg: 'rgba(1, 116, 175, 0.1)',
            status: true,
            link: 'https://linkedin.com'
        },
        {
            name: 'Dropbox',
            icon: 'dropbox',
            avatarColor: '#005ef7',
            avatarBg: 'rgba(0, 94, 247, 0.1)',
            status: false,
            link: 'https://dropbox.com'
        }
    ];

    notificationConfigList = [
        {
            title: "Everyone can look me up",
            desc: "Allow people found on your public.",
            icon: "user",
            color: "ant-avatar-blue",
            status: true
        },
        {
            title: "Everyone can contact me",
            desc: "Allow any peole to contact.",
            icon: "mobile",
            color: "ant-avatar-cyan",
            status: true
        },
        {
            title: "Show my location",
            desc: "Turning on Location lets you explore what's around you.",
            icon: "environment",
            color: "ant-avatar-gold",
            status: false
        },
        {
            title: "Email Notifications",
            desc: "Receive daily email notifications.",
            icon: "mail",
            color: "ant-avatar-purple",
            status: true
        },
        {
            title: "Unknow Source ",
            desc: "Allow all downloads from unknow source.",
            icon: "question",
            color: "ant-avatar-red",
            status: false
        },
        {
            title: "Data Synchronization",
            desc: "Allow data synchronize with cloud server",
            icon: "swap",
            color: "ant-avatar-green",
            status: true
        },
        {
            title: "Groups Invitation",
            desc: "Allow any groups invitation",
            icon: "usergroup-add",
            color: "ant-avatar-orange",
            status: true
        },
    ]
    loadingResidences: boolean = true;
    isModalVisible: boolean = false;
    residenceToShow: Residence;

    constructor(
        private fb: FormBuilder,
        private modalService: NzModalService,
        private message: NzMessageService
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
    }

    showConfirm(): void {
        this.modalService.confirm({
            nzTitle  : '<i>Do you want to change your password?</i>',
            nzOnOk   : () => this.message.success('Password Change Successfully')
        });
    }

    submitForm(): void {
        for (const i in this.addResidenceForm.controls) {
            this.addResidenceForm.controls[ i ].markAsDirty();
            this.addResidenceForm.controls[ i ].updateValueAndValidity();
        }

        this.showConfirm();
    }

    private getBase64(img: File, callback: (img: {}) => void): void {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange(info: { file: NzUploadFile }): void {
        this.getBase64(info.file.originFileObj, (img: string) => {
            this.avatarUrl = img;
        });
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

    handleImageUpload({ file, fileList }: NzUploadChangeParam): void {
        const status = file.status;
        console.log(status)
        if (status !== 'uploading') {
            console.log(file, fileList);
        }
        if (status === 'done') {
            this.message.success(`${file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            this.message.error(`${file.name} file upload failed.`);
        }
    }

    onChooseLocation(event: any) {
      this.addResidenceForm.get('latitude').setValue(event['coords'].lat);
      this.addResidenceForm.get('longitude').setValue(event['coords'].lng);
      this.addResidenceForm.get('latitude').disable()
      this.addResidenceForm.get('longitude').disable()
    }
}
