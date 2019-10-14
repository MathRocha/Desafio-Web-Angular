import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { CadastrarRoutingModule } from './cadastrar-routing.module';
import { CadastrarComponent } from './cadastrar.component';
import { UserService } from 'src/app/shared/services/user.service';
import { AlertModule } from '../components/alert/alert.module';
import { ModalModule } from '../components/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    CadastrarRoutingModule,
    MatGridListModule,
    StatModule,
    MatCardModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    AlertModule,
    FormsModule,
    ModalModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false })
  ],
  declarations: [CadastrarComponent],
  providers: [UserService]
})
export class CadastrarModule {}
