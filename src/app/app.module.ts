import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatRippleModule, MatInputModule,
         MatFormFieldModule, MatNativeDateModule, MatDatepickerToggleIcon, MatDatepickerToggle,
         MatDatepickerInputEvent, MatDatepickerIntl, MatSortModule, MatPaginatorModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS,
         MatProgressBarModule,
         MatDividerModule,
         MatTabsModule,
         MatListModule,
         MatProgressSpinnerModule, } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmDirectionModule } from 'agm-direction';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import { PageComponent } from './page/page.component';
import { LogoComponent } from './page/logo/logo.component';
import { NavigationComponent } from './page/navigation/navigation.component';
import { ContentComponent } from './page/content/content.component';
import { FooterComponent } from './page/footer/footer.component';
import { FirstPanelComponent } from './page/content/first-panel/first-panel.component';
import { AirportsComponent } from './page/content/airports/airports.component';
import { LoginComponent } from './page/login-component/login.component';
import { RegisterComponent } from './page/register-component/register.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { MatTableModule } from '@angular/material/table';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { FlightsComponent } from './page/content/flights/flights.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Flights1Component } from './page/content/flights1/flights1.component';
import { CarsComponent } from './page/content/cars/cars.component';
import { environment } from '../environments/environment';
import { HotelsComponent } from './page/content/hotels/hotels.component';
import { SummaryComponent } from './page/content/summary/summary.component';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { AccountComponent } from './page/content/account/account.component';
import { AccountDetailComponent } from './page/content/account/account-detail/account-detail.component';
import { PlacesComponent } from './page/content/places/places.component';
import { ChartsModule } from 'ng2-charts';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    NavigationComponent,
    ContentComponent,
    FooterComponent,
    FirstPanelComponent,
    AirportsComponent,
    LoginComponent,
    RegisterComponent,
    PageComponent,
    FlightsComponent,
    Flights1Component,
    CarsComponent,
    HotelsComponent,
    SummaryComponent,
    AccountComponent,
    AccountDetailComponent,
    PlacesComponent,

  ],
  imports: [
    BrowserModule,
    CdkStepperModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatListModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatPaginatorModule,
    MatRippleModule,
    MatDividerModule,
    MatStepperModule,
    MatTableModule,
    ChartsModule,
    MatSortModule,
    MatProgressBarModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmDirectionModule,
    AgmSnazzyInfoWindowModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB4z8ExGrK0l77Vl9YRIadi5iaUvZELDho',
      libraries: ['places']
    }),
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule

  ],
  providers: [AuthService,
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}],
  bootstrap: [AppComponent]
})
export class AppModule { }
