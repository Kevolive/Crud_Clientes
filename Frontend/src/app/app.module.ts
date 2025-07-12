import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//primeng
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';






@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule // Import HttpClientModule to enable HTTP services


  ],
  providers: [provideClientHydration(),

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
