import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent implements OnInit {
  nomeText: string;
  empregoText: string;
  showAlert = false;
  alertMessage: string;
  tipoAlerta: string;
  isCadastrar: boolean;
  userId: string;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['id'];
      this.nomeText = params['nome'];
    });

    this.isCadastrar = this.userId ? false : true;
  }

  cadastrar() {
    this.showAlert = false;
    this.userService.cadastrar(this.nomeText, this.empregoText).subscribe(
      result => {
        this.alertMessage = 'Usuário cadastrado com sucesso!';
        this.tipoAlerta = 'success';
        this.showAlert = true;
        this.dialog.open(ModalComponent, {
          width: '300px',
          data: { isExclusao: false, mensagemRetorno: JSON.stringify(result) }
        });
        setTimeout(() => (this.showAlert = false), 5000);
      },
      err => {
        this.alertMessage = err;
        this.tipoAlerta = 'danger';
        this.showAlert = true;
        this.dialog.open(ModalComponent, {
          width: '300px',
          data: { isExclusao: false, mensagemRetorno: JSON.stringify(err) }
        });
      }
    );
  }

  editar() {
    this.showAlert = false;
    this.userService.editar(this.userId, this.empregoText).subscribe(
      result => {
        this.alertMessage = 'Usuário editado com sucesso!';
        this.tipoAlerta = 'success';
        this.showAlert = true;
        this.dialog.open(ModalComponent, {
          width: '300px',
          data: { isExclusao: false, mensagemRetorno: JSON.stringify(result) }
        });
        setTimeout(() => (this.showAlert = false), 5000);
      },
      err => {
        this.alertMessage = err;
        this.tipoAlerta = 'danger';
        this.showAlert = true;
        this.dialog.open(ModalComponent, {
          width: '300px',
          data: { isExclusao: false, mensagemRetorno: JSON.stringify(err) }
        });
      }
    );
  }
}
