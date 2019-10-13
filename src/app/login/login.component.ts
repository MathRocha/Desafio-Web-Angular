import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailText: string;
  passwordText: string;
  showAlert = false;
  alertMessage: string;
  tipoAlerta: string;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  onLogin() {
    this.userService.login(this.emailText, this.passwordText).subscribe(
      result => {
        localStorage.setItem('token', result['token']);
        this.router.navigate(['']);
      },
      err => {
        console.log(err);
        this.alertMessage = 'Usuário ou senha incorretos';
        this.tipoAlerta = 'danger';
        this.showAlert = true;
        setTimeout(() => (this.showAlert = false), 5000);
      }
    );
  }
}
