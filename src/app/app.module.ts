import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ExchangeComponent } from './exchange/exchange.component';
import {CryptoService} from './services/crypo-service.service';
import {CommonModule} from '@angular/common';
import {MatCardModule, MatListModule, MatOptionModule, MatSelectModule, MatSliderModule, MatTooltipModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StorageServiceModule} from 'angular-webstorage-service';

// import {ChartsModule} from 'ng2-charts';

import { GraphComponent } from './graph/graph.component';
import {AppRoutingModule} from './app-routing';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ExchangeComponent,
    GraphComponent
  ],
  imports: [
    AppRoutingModule,

    HttpClientModule,

    BrowserModule,
    BrowserAnimationsModule,

    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatOptionModule,
    MatSliderModule,
    MatTooltipModule,

    NgxChartsModule,
    StorageServiceModule
  ],
  providers: [CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
