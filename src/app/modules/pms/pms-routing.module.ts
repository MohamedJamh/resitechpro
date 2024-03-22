import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ResidenceComponent} from "./pages/residence/residence.component";
import {BuildingComponent} from "./pages/building/building.component";
import {PropertyComponent} from "./pages/property/property.component";

const routes: Routes = [
  {
    path: 'residences',
    component: ResidenceComponent,
    data: {
      title: 'Residences',
      headerDisplay: "none"
    }
  },
  {
    path: 'buildings',
    component: BuildingComponent,
    data: {
      title: 'Buildings',
      headerDisplay: "none"
    }
  },
  {
    path: 'properties',
    component: PropertyComponent,
    data: {
      title: 'Properties',
      headerDisplay: "none"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmsRoutingModule { }
