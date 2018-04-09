import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatRippleModule, MatInputModule,
         MatFormFieldModule, MatNativeDateModule, MatDatepickerToggleIcon, MatDatepickerToggle,
         MatDatepickerInputEvent, MatDatepickerIntl, } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmDirectionModule } from 'agm-direction';
import { FirstPanelComponent } from './content/first-panel/first-panel.component';
import { AutocompleteComponent } from './content/first-panel/autocomplete/autocomplete.component';


@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    NavigationComponent,
    ContentComponent,
    FooterComponent,
    AutocompleteComponent,
    FirstPanelComponent,

  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AgmDirectionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4z8ExGrK0l77Vl9YRIadi5iaUvZELDho',
      libraries: ['places']
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
