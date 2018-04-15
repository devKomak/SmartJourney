import { NgModule } from "@angular/core";
import { RouterModule, Routes, CanActivate, Router } from '@angular/router';

import { AppComponent } from "./app.component";
import { AirportsComponent } from "./page/content/airports/airports.component";
import { FirstPanelComponent } from "./page/content/first-panel/first-panel.component";
import { LoginComponent } from "./page/login-component/login.component";
import { PageComponent } from "./page/page.component";


const appRoutes: Routes = [
    {path: '' , component: AppComponent, children :[
        {path: '', component: PageComponent, children:[
            {path: '', component: FirstPanelComponent},
            {path: 'airports', component: AirportsComponent}
        ]}
    ]},

    {path: 'login', component: LoginComponent}

  ];

@NgModule({
    imports:[
    RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}