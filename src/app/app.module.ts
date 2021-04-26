import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { CoinChartComponent } from './coin-chart/coin-chart.component';
import { AlarmListComponent } from './alarm-list/alarm-list.component';
import { AlarmComponent } from './alarm-list/alarm/alarm.component';

@NgModule({
  declarations: [
    AppComponent,
    DatePickerComponent,
    CoinChartComponent,
    AlarmListComponent,
    AlarmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [FormsModule, ReactiveFormsModule]
})
export class AppModule { }
