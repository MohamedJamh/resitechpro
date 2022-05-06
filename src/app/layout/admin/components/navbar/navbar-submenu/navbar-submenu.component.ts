import { Component, Input, OnInit } from '@angular/core';
import { SubMenuItem } from 'src/app/shared/models/menu.model';

@Component({
  selector: 'app-navbar-submenu',
  templateUrl: './navbar-submenu.component.html',
  styleUrls: ['./navbar-submenu.component.scss']
})
export class NavbarSubmenuComponent implements OnInit {

  @Input() public submenu = <SubMenuItem>{};

  constructor() { }

  ngOnInit(): void {
  }

}
