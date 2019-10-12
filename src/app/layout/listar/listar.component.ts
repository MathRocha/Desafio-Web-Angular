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

  getUserList() {
    this.loading = true;
    this.showAlert = false;
    this.userService.listar().subscribe(
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
}
