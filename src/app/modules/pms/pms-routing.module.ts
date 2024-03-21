import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ResidenceComponent} from "./pages/residence/residence.component";
import {BuildingComponent} from "./pages/building/building.component";

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmsRoutingModule { }
