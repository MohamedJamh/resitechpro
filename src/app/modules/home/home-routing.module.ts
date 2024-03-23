import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LandingComponent} from "./pages/landing/landing.component";

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: {
      title: 'Resitech Pro',
      headerDisplay: "none"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
