// src/app/profile/profile.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

const User = {
  _id: 'string', 
  username: 'string', 
  password: 'string', 
  email: 'string', 
  favoriteMovies: 'any[]'
};

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  user: userData = {};
  favoriteMovies: any[] = [];

  @Input() userData = { Name: '', Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const user = this.getUser();
    this.getfavoriteMovies();

    if (!user._id) {
      this.router.navigate(['welcome']);
    }

    this.user = user; 

    this.userData = {
      username: user.username || "",
      password: user.password || "",
      email: user.email || "",
    };
  }

  getUser(): void {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  updateUser(): void {
    this.fetchApiData.editUserInfo(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));

      console.log('updateUser called');
      console.log('result:', result);

      this.user = result;
      this.snackBar.open('Profile updated successfully!', 'OK', {
        duration: 2000
      });
    });
  }

  getfavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies) => {
      this.favoriteMovies = movies.filter((movie: any) => {
      return this.user.favoriteMovies?.includes(movies._id);
      });
  });
}

  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe((result) => {
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open('Profile deleted successfully!', 'OK', {
        duration: 2000
      });
    });
  }

  deleteFavoriteMovie(): void {
    this.fetchApiData.deleteFavoriteMovie().subscribe((result) => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('user');
      return this.delete(FavoriteMovie);
      });
      this.snackBar.open('Movie removed from favorites!', 'OK', {
        duration: 2000
      });
    }
  }