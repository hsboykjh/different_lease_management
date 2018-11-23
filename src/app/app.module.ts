import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LeaseDetailComponent} from "./components/leaseDetail.component";
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {DateSuffix} from "./pipe/dateSuffix";

const appRoutes = [
  {path: 'lease', component: LeaseDetailComponent},
  {path: '', redirectTo: 'lease', pathMatch: 'full'},
  {path: '**', redirectTo: 'lease', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    LeaseDetailComponent,
    DateSuffix
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
