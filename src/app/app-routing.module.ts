import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {IsSignedInGuard} from './auth/is-signed-in.guard';
import {ProvidersComponent} from './providers/providers.component';
import {ProductsComponent} from './products/products.component';
import {BudgetsComponent} from './budgets/budgets.component';
import {BudgetLinesComponent} from './budgets/budget-lines/budget-lines.component';
import {ProductsImportComponent} from './products/products-import/products-import.component';
import {UsersComponent} from './users/users.component';
import {TeamsComponent} from './teams/teams.component';
import {LoginComponent} from './auth/login/login.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [IsSignedInGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'providers', component: ProvidersComponent, canActivate: [IsSignedInGuard]},
  {path: 'products', component: ProductsComponent, canActivate: [IsSignedInGuard]},
  {path: 'products-import/:id', component: ProductsImportComponent, canActivate: [IsSignedInGuard]},
  {path: 'budgets', component: BudgetsComponent, canActivate: [IsSignedInGuard]},
  {path: 'budget-lines', component: BudgetLinesComponent, canActivate: [IsSignedInGuard]},
  {path: 'users', component: UsersComponent, canActivate: [IsSignedInGuard]},
  {path: 'teams', component: TeamsComponent, canActivate: [IsSignedInGuard]},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
