import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'listar'
      },
      {
        path: 'listar',
        loadChildren: './listar/listar.module#ListarModule'
      },
      {
        path: 'cadastrar',
        loadChildren: './cadastrar/cadastrar.module#CadastrarModule'
      },
      {
        path: 'editar',
        loadChildren: './cadastrar/cadastrar.module#CadastrarModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
