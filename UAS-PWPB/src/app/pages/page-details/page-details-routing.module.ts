import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageDetailsPage } from './page-details.page';

const routes: Routes = [
  {
    path: '',
    component: PageDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageDetailsPageRoutingModule {}
