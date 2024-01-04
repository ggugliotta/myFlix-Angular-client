import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor (
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) { }
  
  /**
   * Navigates to movies
   */
  toMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to profile
   */
  toProfile(): void {
    this.router.navigate(['profile']);
  }
  /**
   * Logs user out
   * @returns user and token removed from local storage
   * @returns user navigated to welcome page
   */
  logoutUser(): void{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

}
