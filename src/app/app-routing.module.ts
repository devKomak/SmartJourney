import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { FirstPanelComponent } from './content/first-panel/first-panel.component';
import { AutocompleteComponent } from './content/first-panel/autocomplete/autocomplete.component';
import { AirportsComponent } from './content/airports/airports.component';


const appRoutes: Routes = [
    {path: '' , component: FirstPanelComponent},
    {path: 'airports' , component: AirportsComponent}
  ];

@NgModule({
    imports:[
    RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}