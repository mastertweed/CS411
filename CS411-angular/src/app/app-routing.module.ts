import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CityListComponent } from "../app/components/city/city-list/city-list.component";
import { LocationListComponent } from './components/location/location-list/location-list.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { IncentivesListComponent } from "./components/incentives/incentives-list/incentives-list.component";
import { ClimateListComponent } from "./components/climate/climate-list/climate-list.component";
import { HousingListComponent } from "./components/housing/housing-list/housing-list.component";
import { PrefersListComponent } from "./components/prefers/prefers-list/prefers-list.component";

const routes: Routes = [
  { path: "", component: UserListComponent },
  { path: "user", component: UserListComponent },
  { path: "city", component: CityListComponent },
  { path: "location", component: LocationListComponent },
  { path: "incentives", component: IncentivesListComponent },
  { path: "climate", component: ClimateListComponent },
  { path: "housing", component: HousingListComponent },
  { path: "prefers", component: PrefersListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
