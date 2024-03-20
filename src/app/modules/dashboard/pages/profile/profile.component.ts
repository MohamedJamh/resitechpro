import {Component, OnInit} from '@angular/core'
import {AuthService} from "../../../../shared/services/core/auth.service";
import {User} from "../../../../shared/models/iuser.model";
import {FormGroup} from "@angular/forms";

@Component({
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit{

    constructor(
      private authService : AuthService
    ) {}

    ngOnInit() {
    }

    authenticatedUser : User = this.authService.getAuthenticatedUser();
    updateProfileForm: FormGroup;
    updatePasswordForm: FormGroup;
    updateProfileFormSubmitted: boolean = false;

    employeesListData = [
      // {
      //   name: 'Erin Gonzales',
      //   src: 'assets/images/avatars/thumb-1.jpg',
      //   title: 'UI/UX Designer'
      // },
    ];

    residencesListData = [
        // {
        //     name: 'Coffee Finder App',
        //     img: 'assets/images/others/coffee-app-thumb.jpg',
        //     desc: 'It is a long established fact that a reader will be distracted by the readable content.',
        //     status: 'In Progress',
        //     participate: [
        //         {
        //             name: 'Eugene Jordan',
        //             img: 'assets/images/avatars/thumb-6.jpg'
        //         },
        //         {
        //             name: 'Pamela',
        //             img: 'assets/images/avatars/thumb-7.jpg'
        //         }
        //     ]
        // },
    ];


    disableSubmitButton() : boolean {
      return this.updateProfileFormSubmitted
    }

    updateProfile() {

    }

    updatePassword(){

    }
}
