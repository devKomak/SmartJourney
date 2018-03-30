import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { NavigationComponent } from './navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
