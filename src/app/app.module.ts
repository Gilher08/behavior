import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';
import { HttpClient } from '@angular/common/http';
import { CachingInterceptor } from './shared/interceptors/caching.interceptor';
import { JokeListComponent } from './joke-list/joke-list.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    HomeComponent,
    JokeListComponent,
    RxjsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  providers: [
      HttpClient,
      // { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
