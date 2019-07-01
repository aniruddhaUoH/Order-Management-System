import {BrowserModule, Title} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {PageNotFoundComponent} from "./error-pages/404-page-not-found/page-not-found.component";
import {AuthenticateCustomerComponent} from "./ordermgmt/authenticate-customer/authenticate-customer.component";
import {OrderManagementComponent} from "./ordermgmt/order-management/order-management.component";
import {AuthCheckGuard} from "./services/auth-check.guard";
import {HeaderComponent} from "./header/header.component";
import {OrderManagementService} from "./services/order-management.service";
import {NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: AuthenticateCustomerComponent},
  {path: 'order-management', component: OrderManagementComponent, canActivate: [AuthCheckGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    OrderManagementComponent,
    HeaderComponent,
    AuthenticateCustomerComponent
  ],
  entryComponents: [
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    Title,
    DatePipe,
    AuthCheckGuard,
    OrderManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
