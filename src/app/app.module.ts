import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProvidersComponent } from './providers/providers.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { ProviderFormComponent } from './providers/provider-form/provider-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import { ProductsComponent } from './products/products.component';
import { ProductQuantityFormComponent } from './products/product-quantity-form/product-quantity-form.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OrdersComponent } from './orders/orders.component';
import { OrderItemComponent } from './orders/order-item/order-item.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { CartComponent } from './orders/cart/cart.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { BudgetLinesComponent } from './budgets/budget-lines/budget-lines.component';
import { BudgetListComponent } from './budgets/budget-list/budget-list.component';
import { BudgetDetailComponent } from './budgets/budget-detail/budget-detail.component';
import { BudgetFilterFormComponent } from './budgets/budget-filter-form/budget-filter-form.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { ProductsImportComponent } from './products/products-import/products-import.component';
import {SortableModule} from 'ngx-bootstrap/sortable';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import { TeamsComponent } from './teams/teams.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { TeamFormComponent } from './teams/team-form/team-form.component';
import { LoginComponent } from './auth/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ProvidersComponent,
    ProviderFormComponent,
    ProductsComponent,
    ProductQuantityFormComponent,
    OrdersComponent,
    OrderItemComponent,
    OrderListComponent,
    CartComponent,
    BudgetsComponent,
    BudgetLinesComponent,
    BudgetListComponent,
    BudgetDetailComponent,
    BudgetFilterFormComponent,
    ProductsImportComponent,
    TeamsComponent,
    UsersComponent,
    UserFormComponent,
    TeamFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SortableModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 6000,
      progressBar: true,
      extendedTimeOut: 0,
      autoDismiss: false
    }),
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
