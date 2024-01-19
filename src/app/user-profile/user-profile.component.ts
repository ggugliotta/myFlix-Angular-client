// src/app/profile/profile.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { WelcomePageComponent } from '../welcome-page/welcome-page.component';

type User = {
  _id?: string;
  username?: string;
  password?: string;
  email?: string;
  favoriteMovies?: any[];
};

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})

export class UserProfileComponent implements OnInit {
  user: any = { Name: '', Username: '', Password: '', Email: '', Birthday: '' };
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  public loadUser(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.fetchApiData.getAllMovies().subscribe((movies) => {
      this.favoriteMovies = movies.filter((movie: any) =>
        this.user.favoriteMovies?.includes(movies._id)
      );
    });
  }

  /**
   * Return to home page
   */

  public back(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Open user update dialog to update user info
   */
  /**editUserInfo(): void {
    this.fetchApiData.editUserInfo().subscribe((users) => {
      this.user = updatedUser
    });
  }
  */

  deleteFavoriteMovie(favoriteMovie: string): void {
    this.fetchApiData.deleteFavoriteMovie().subscribe((favoriteMovie) => {
      this.favoriteMovies = this.favoriteMovies.filter((movie: any) => {
        return movie._id !== favoriteMovie;
      });
      this.snackBar.open('Movie removed from favorites!', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * Deletes user account and returns to welcome page
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe((result: any) => {
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open('Profile deleted successfully!', 'OK', {
        duration: 2000,
      });
    });
  }
}
