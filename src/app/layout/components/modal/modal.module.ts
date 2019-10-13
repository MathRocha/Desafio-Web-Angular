import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatDialogModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { ModalComponent } from './modal.component';

@NgModule({
  declarations: [ModalComponent],
  imports: [CommonModule, MatInputModule, MatFormFieldModule, FormsModule, MatDialogModule],
  exports: [ModalComponent],
  entryComponents: [ModalComponent]
})
export class ModalModule {}
