import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss']
})
export class CadastrarComponent {
  nomeText: string;
  empregoText: string;
  showAlert = false;
  alertMessage: string;
  tipoAlerta: string;

  constructor(private userService: UserService) {}

  cadastrar() {
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
}
