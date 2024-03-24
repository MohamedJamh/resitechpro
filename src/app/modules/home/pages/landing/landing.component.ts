import {Component, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {FormGroup} from "@angular/forms";
import {PropertyTypeEnum} from "../../../../shared/enums/property-type.enum";
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
  searchForm: FormGroup;
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

  constructor() { }

  ngOnInit(): void {
  }


  search() {

  }

  searchForProperties() {

  }
}
