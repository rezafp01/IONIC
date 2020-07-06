import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
//import ini dulu nge baca File JSON [2]
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    // import HttpClientModule after BrowserModule. [1]
    HttpClientModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
