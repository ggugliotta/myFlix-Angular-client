import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }
  /**
   * logs out user and clears local storage
   */
  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log('logout successful');
    this.snackBar.open('Logout successful', 'OK', {
      duration: 2000
    });
    this.router.navigate(['welcome']);
  }

  /**
   * @returns a boolean if user is currently logged in by checking local storage
  */
 isUserLoggedIn(): boolean {
  const user = localStorage.getItem('user');
  return user !== null && user !== undefined; 
 }

}
