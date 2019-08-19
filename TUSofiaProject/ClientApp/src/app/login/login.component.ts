import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FilesTransferService } from '../services/files-transfer.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  user = {
    userName: '',
    password: ''
  };

  constructor(private filesTransferService: FilesTransferService, private router: Router, private toastr: ToastrService, private cookieService: CookieService) { }

  ngOnInit() {
    const token = this.cookieService.get('token');

    if (token) {
      this.router.navigate(['/upload']);
    }
  }

  login() {
    if (this.userName && this.password) {
      this.user.userName = this.userName;
      this.user.password = this.password;

      this.filesTransferService.login(this.user).subscribe(() => {
        this.router.navigate(['/upload']);
      }, error => {
        console.log(error);
        this.toastr.error('Грешно име или парола!', 'Внимание!');
      });
    } else {
      this.toastr.error('Моля въведете име и парола!', 'Внимание!');
    }
  }

  redirectToDashboardComponent() {
    this.router.navigate(['/home']);
  }
}
