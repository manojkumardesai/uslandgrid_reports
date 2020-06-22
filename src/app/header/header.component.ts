import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_services/login.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor(public loginService: LoginService, public router: Router,
    public dialog: MatDialog, public _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginService.user.subscribe((data) => {
      this.isLoggedIn = data && data.loggedIn ? data.loggedIn : false;
    });
  }

  routeToLogin() {
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } })
  }


  logout() {
    this.loginService.publishLoginResponseFalse();
    this.openSnackBar('Logged out successfully', 'Dismiss');
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

}
