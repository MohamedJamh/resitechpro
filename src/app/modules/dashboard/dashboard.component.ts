import { Component, OnInit } from '@angular/core';
import {User} from "../../shared/models/iuser.model";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {
  constructor() {}

    authUser : User
    ngOnInit(): void {}
}
