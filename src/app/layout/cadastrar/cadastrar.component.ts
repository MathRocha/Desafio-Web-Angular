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

  constructor(private userService: UserService) {}

  cadastrar() {
    console.log(this.nomeText);
    console.log(this.empregoText);
    this.userService.cadastrar(this.nomeText, this.empregoText).subscribe(
      result => {
        console.log(result);
      },
      err => {
        console.log(err);
      }
    );
  }
}

/* this.userService.listar(page, per_page).subscribe(
  result => {
    this.userList = result.data;
    this.pageData = { page: result.page, per_page: result.per_page, total: result.total, total_pages: result.total_pages };
    this.loading = false;
  },
  err => {
    console.log(err);
    this.loading = false;
    this.alertMessage = 'Erro ao carregar lista de usuários';
    this.showAlert = true;
  }
); */
