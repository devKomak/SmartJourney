import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, Router } from '@angular/router';

import { AppComponent } from './app.component';
import { AirportsComponent } from './page/content/airports/airports.component';
import { FirstPanelComponent } from './page/content/first-panel/first-panel.component';
import { LoginComponent } from './page/login-component/login.component';
import { PageComponent } from './page/page.component';
import { FlightsComponent } from './page/content/flights/flights.component';
import { Flights1Component } from './page/content/flights1/flights1.component';
import { CarsComponent } from './page/content/cars/cars.component';
import { ErrorComponent } from './page/error/error.component';
import { SummaryComponent } from './page/content/summary/summary.component';
import { RegisterComponent } from './page/register-component/register.component';
import { AccountComponent } from './page/content/account/account.component';
import { AccountDetailComponent } from './page/content/account/account-detail/account-detail.component';


const appRoutes: Routes = [
    {path: '' , component: AppComponent, children : [
        {path: '', component: PageComponent, children: [
            {path: '', component: FirstPanelComponent},
            {path: 'airports', component: AirportsComponent},
            {path: 'flights', component: FlightsComponent},
            {path: 'flights1', component: Flights1Component},
            {path: 'cars', component: CarsComponent},
            {path: 'summary', component: SummaryComponent},
            {path: 'account', component: AccountComponent},
            {path: 'detail/:id', component: AccountDetailComponent}
        ]}
    ]},
    {path: 'summary', component: SummaryComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}

  ];

@NgModule({
    imports: [
    RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
