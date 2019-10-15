import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ModalComponent } from '../../layout/components/modal/modal.component';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private dialog: MatDialog) {}

  canActivate() {
    if (localStorage.getItem('token')) {
      return true;
    }

    const modal = this.dialog.open(ModalComponent, {
      width: '300px',
      data: {
        isExclusao: false,
        titulo: 'Acesso Negado',
        mensagem: 'Realize o login para poder acessar a página',
        closeButtonLabel: 'Ir para página de login'
      }
    });

    modal.afterClosed().subscribe(() => {
      this.router.navigate(['/login']);
      return false;
    });
  }
}
