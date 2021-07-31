import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInventoryComponent } from './inventory/add-inventory/add-inventory.component';

const routes: Routes = [
  {
    path: 'inventory',
    component: AddInventoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
