// src/app/fetch-api-data.service.ts
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://moviesapi-zy5e.onrender.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

 /**
  * Making the api call for the user registration endpoint
  * @param userDetails
  * @returns an observable with the user
  */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Making the api call for the user login endpoint
   * @param userDetails
   * @returns an observable with the user
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', { Username: username, Password: password }).pipe(
    catchError(this.handleError)
    );
  }

  /** Making the api call for all movies endpoint 
   * @returns an observable with an array of movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log the token value 
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for a single movie endpoint
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Title', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the director endpoint
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + directorName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the genre endpoint
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + genreName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for the user endpoint
  getUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  // Making the api call for the get favorite movies for a user endpoint
  getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}/movies`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      map((data) => data.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  // Making the api call for adding a movie to a user's list of favorites
  addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.post(apiUrl + `users/user/${movieId}`, {}, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making the api call for updating a user's info
  editUserInfo(updatedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.put(apiUrl + "users/" + user.Username, updatedUser, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for deleting a user
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.delete(apiUrl + "users/" + user._id, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      catchError(this.handleError)
    );
  }

  // Making the api call for deleting a movie from a user's list of favorites
  deleteFavoriteMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/movies/:MovieID`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * 
   * @param movieId 
   * @returns boolean value if user contains themovie in their FavoriteMovies 
   */
  isFavoriteMovie(movieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      return user.FavoriteMovies.includes(movieId);
    }
    return false;
  }

  //Non-typed response extraction 
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
    