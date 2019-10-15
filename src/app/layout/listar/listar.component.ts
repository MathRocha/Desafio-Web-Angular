import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { UserService, User, PageData } from 'src/app/shared/services/user.service';
import { ModalComponent } from '../components/modal/modal.component';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  userList: User[];
  pageData: PageData;
  columnsToDisplay = ['id', 'nome', 'foto', 'editar', 'excluir'];
  loading: boolean;
  showAlert = false;
  alertMessage: string;
  tipoAlerta: string;

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.getUserList();
  }

  getUserList(page = 1, per_page = 6) {
    this.loading = true;
    this.showAlert = false;
    this.userService.listar(page, per_page).subscribe(
      result => {
        this.userList = result.data;
        this.pageData = { page: result.page, per_page: result.per_page, total: result.total, total_pages: result.total_pages };
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
        this.alertMessage = 'Erro ao carregar lista de usuários';
        this.tipoAlerta = 'danger';
        this.showAlert = true;
      }
    );
  }

  filtrar(filtro: string) {
    if (filtro) {
      this.loading = true;
      this.showAlert = false;
      this.userList = [];
      this.userService.listarPorId(filtro).subscribe(
        result => {
          this.userList.push(result.data);
          this.pageData.page = 1;
          this.pageData.total = 1;
          this.pageData.total_pages = 1;
          this.loading = false;
        },
        err => {
          console.log(err);
          this.loading = false;
          this.alertMessage = 'Erro ao realizar filtro';
          this.tipoAlerta = 'danger';
          this.showAlert = true;
        }
      );
    } else {
      this.getUserList();
    }
  }

  pageChangeEvent(changePage: ChangePage) {
    this.pageData.page = changePage.pageIndex + 1; // Correção de valor, pois o valor da primeira página é 0, enquanto na api é 1
    this.pageData.per_page = changePage.pageSize;
    this.getUserList(this.pageData.page, this.pageData.per_page);
  }

  goToEditar(user: User) {
    this.router.navigate(['/editar'], { queryParams: { id: user.id, nome: `${user.first_name} ${user.last_name}` } });
  }

  deletarUsuario(user: User): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      data: {
        user,
        isExclusao: true,
        titulo: 'Excluir Usuário',
        mensagem: `Deseja excluir ${user.first_name} ${user.last_name}?`,
        hasConfirmButton: true,
        closeButtonLabel: 'Não'
      }
    });

    dialogRef.afterClosed().subscribe(id => {
      if (id) {
        this.userService.deletar(id).subscribe(
          result => {
            this.alertMessage = 'Usuário deletado com sucesso';
            this.tipoAlerta = 'success';
            this.showAlert = true;
            this.dialog.open(ModalComponent, {
              width: '300px',
              data: { isExclusao: false, mensagem: JSON.stringify(result), titulo: 'Retorno da API', closeButtonLabel: 'Fechar' }
            });
          },
          err => {
            this.alertMessage = 'Erro ao deletar usuário';
            this.tipoAlerta = 'danger';
            this.showAlert = true;
            this.dialog.open(ModalComponent, {
              width: '300px',
              data: { isExclusao: false, mensagem: JSON.stringify(err), titulo: 'Retorno da API', closeButtonLabel: 'Fechar' }
            });
          }
        );
      }
    });
  }
}

export interface ChangePage {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}
