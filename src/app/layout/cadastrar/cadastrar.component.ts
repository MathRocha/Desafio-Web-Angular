import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) {}

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
      () => {
        this.alertMessage = 'Usuário cadastrado com sucesso!';
        this.tipoAlerta = 'success';
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      },
      err => {
        console.log(err);
        this.alertMessage = err;
        this.tipoAlerta = 'danger';
        this.showAlert = true;
      }
    );
  }

  editar() {
    this.showAlert = false;
    this.userService.editar(this.userId, this.empregoText).subscribe(
      () => {
        this.alertMessage = 'Usuário editado com sucesso!';
        this.tipoAlerta = 'success';
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      },
      err => {
        console.log(err);
        this.alertMessage = err;
        this.tipoAlerta = 'danger';
        this.showAlert = true;
      }
    );
  }
}
