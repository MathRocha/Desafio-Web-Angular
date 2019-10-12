import { Component, OnInit } from '@angular/core';
import { UserService, User, PageData } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.scss']
})
export class ListarComponent implements OnInit {
  userList: User[];
  pageData: PageData;
  columnsToDisplay = ['id', 'nome', 'foto'];
  loading: boolean;
  showAlert = false;
  alertMessage: string;

  constructor(private userService: UserService) {}

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
        console.log(this.pageData);
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
        this.alertMessage = 'Erro ao carregar lista de usuários';
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
          this.loading = false;
        },
        err => {
          console.log(err);
          this.loading = false;
          this.alertMessage = 'Erro ao realizar filtro';
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
}

export interface ChangePage {
  length: number;
  pageIndex: number;
  pageSize: number;
  previousPageIndex: number;
}
