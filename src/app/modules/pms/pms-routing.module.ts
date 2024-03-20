import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ResidencesComponent} from "./pages/setting/residences.component";

const routes: Routes = [
  {
      path: 'residences',
      component: ResidencesComponent,
      data: {
        title: 'Residences',
        headerDisplay: "none"
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PmsRoutingModule { }
