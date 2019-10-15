import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule
} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { ListarRoutingModule } from './listar-routing.module';
import { ListarComponent } from './listar.component';
import { UserService } from 'src/app/shared/services/user.service';
import { AlertModule } from '../components/alert/alert.module';

@NgModule({
  imports: [
    CommonModule,
    ListarRoutingModule,
    MatGridListModule,
    StatModule,
    MatCardModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    AlertModule,
    MatDialogModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  declarations: [ListarComponent],
  providers: [UserService]
})
export class ListarModule {}
