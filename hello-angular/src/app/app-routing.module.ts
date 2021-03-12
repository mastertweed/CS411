import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CityListComponent } from "../app/components/city/city-list/city-list.component";
import { LocationListComponent } from './components/location/location-list/location-list.component';
import { UserListComponent } from './components/users/user-list/user-list.component';

const routes: Routes = [
  { path: "", component: UserListComponent },
  { path: "city", component: CityListComponent },
  { path: "location", component: LocationListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
