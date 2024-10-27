import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { PartyFormComponent } from './party-form/party-form.component';
import { PartyListComponent } from './party-list/party-list.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [AppComponent,
    PartyFormComponent,
    PartyListComponent,
    HeaderComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class PartyManagementModule { }
