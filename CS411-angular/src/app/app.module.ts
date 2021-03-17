import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCreateComponent } from "./components/users/user-create/user-create.component";
import { UserListComponent } from './components/users/user-list/user-list.component';
import { CityListComponent } from './components/city/city-list/city-list.component';
import { ClimateListComponent } from './components/climate/climate-list/climate-list.component';
import { HousingListComponent } from './components/housing/housing-list/housing-list.component';
import { IncentivesListComponent } from './components/incentives/incentives-list/incentives-list.component';
import { LocationListComponent } from './components/location/location-list/location-list.component';
import { PrefersListComponent } from './components/prefers/prefers-list/prefers-list.component';
import { PreferenceFormComponent } from './components/preference-form/preference-form.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    UserCreateComponent,
    UserListComponent,
    CityListComponent,
    ClimateListComponent,
    HousingListComponent,
    IncentivesListComponent,
    LocationListComponent,
    PrefersListComponent,
    PreferenceFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
