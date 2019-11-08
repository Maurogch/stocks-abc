import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { SmartTableArts1Component } from './smart-table-arts1/smart-table-arts1.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';

const routes: Routes = [
  {
    path: '',
    component: TablesComponent,
    children: [
      {
        path: 'smart-table-arts1',
        component: SmartTableArts1Component
      },
      {
        path: 'smart-table',
        component: SmartTableComponent
      },
      {
        path: 'tree-grid',
        component: TreeGridComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablesRoutingModule {}

export const routedComponents = [
  TablesComponent,
  SmartTableArts1Component,
  SmartTableComponent,
  TreeGridComponent
];
