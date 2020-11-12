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


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [IsSignedInGuard]},
  {path: 'providers', component: ProvidersComponent, canActivate: [IsSignedInGuard]},
  {path: 'products', component: ProductsComponent, canActivate: [IsSignedInGuard]},
  {path: 'products-import/:id', component: ProductsImportComponent, canActivate: [IsSignedInGuard]},
  {path: 'budgets', component: BudgetsComponent, canActivate: [IsSignedInGuard]},
  {path: 'budget-lines', component: BudgetLinesComponent, canActivate: [IsSignedInGuard]},
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
