import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ResidenceComponent} from "./pages/residence/residence.component";
import {BuildingComponent} from "./pages/building/building.component";
import {PropertyComponent} from "./pages/property/property.component";
import {AuthGuard} from "../../shared/guards/auth.guard";

const routes: Routes = [
  {
    path: 'residences',
    component: ResidenceComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Residences',
      headerDisplay: "none"
    }
  },
  {
    path: 'buildings',
    component: BuildingComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Buildings',
      headerDisplay: "none"
    }
  },
  {
    path: 'properties',
    component: PropertyComponent,
    canActivate: [AuthGuard],
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
