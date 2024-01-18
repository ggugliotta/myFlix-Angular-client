// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  movies: any[] = [];
  users: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router, 
    public dialog: MatDialog, 
    public snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getMovies();
  }
  /**
   * @returns all the movie list 
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
 * Opens the genre dialog to show genre details once the button is clicked
 * @param genre
 */
  openGenreDialog(name: string, description: string ): void {
    this.dialog.open(GenreComponent, {
      data: {
        genre: {
         name,
          description
        },
      },
      width: '400px', height: '300px'
    });
  }
  /**
   * Opens the director dialog to show director details once the button is clicked
   * @param director
   */
  openDirectorDialog(name: string, bio: string, birth: number, movies: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        name,
        bio,
        birth,
        movies
      },
      width: '400px', height: '300px'
    });
  }
  /**
   * Opens the movie details dialog to show movie details once the button is clicked
   * @param description
   */
    openMovieDetailsDialog( 
      description: string, actors: string, 
      releaseyear: Date, rating: string
     ): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {
        description,
        actors,
        releaseyear, 
        rating
      },
      width: '400px', height: '300px'
    });
  }

}

/**
 * Check to see if the movie is in the user's list of favorites
 * @param movie_id  
 * @returns boolean
 */
  /* public isFavorite(movieId: string): boolean {
    return favoriteMovies.(movieId);
  }


  /** 
   * Adds the movie to the user's list of favorites when icon is clicked
   * @param movie_id
   */
  /*public addToFavoriteMovies(movie_id: string){
    this.user.favoriteMovies.push(movie_id);
    localStorage.setItem('user', JSON.stringify(this.user));
      this.fetchApiData.addFavoriteMovie(movie_id).subscribe((response) => {
      console.log(response);
      })
      console.log('Added to favorites!', 'OK', {
        duration: 2000
      });
  }


  /**
   * Removes the movie from the user's list of favorites when icon is clicked
   * @param movie_id
   */
 /* public removeFromFavoriteMovies(movie_id: any){
    this.user.favoriteMovies = this.user.favoriteMovies.filter((id: string) => id !== movie_id);
    localStorage.setItem('user', JSON.stringify(this.user));
      this.fetchApiData.deleteFavoriteMovie().subscribe((response) => {
      console.log(response);
      })
      console.log('Removed from favorites!', 'OK', {
        duration: 2000
      });
  }*/