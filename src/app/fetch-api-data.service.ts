import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api-movieflix.onrender.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  /**
  * Making the api call for the user registration endpoint
  * @param userDetails 
  * @returns a user that has been registered in the DB
  * used in user-registration-form component 
  */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'signup', userDetails)
      .pipe(catchError(this.handleError));
  }
  /**
  * direct users to the login page.
  * @param userDetails 
  * @returns will log in the user with a token and user info in local storage
  * used in user-login-form component 
  */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Making the api call for the get all movies endpoint
   * @returns an observable with an array of movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Making the api call for the get one movie endpoint
   * @param Title 
   * @returns an obseravle with a movie object
   */
  getOneMovie(Title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + Title,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  /**
   * Making the api call fo the get one director endpoint
   * @param directorName 
   * @returns an obseravle with director object
   */
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  /**
   * Making the api call fo the get one genre endpoint
   * @param genreName 
   * @returns an obseevable with a genre object
   */
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres/' + genreName,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }
  /**
   * Making the api call for the get one user endpoint
   * @param Username 
   * @returns an observable with a user object
   */
  getOneUser(Username: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
    // localStorage.getItem('Username');
    // const token = localStorage.getItem("token");
    // return this.http.get(apiUrl + 'users/' + username,
    //   {
    //     headers: new HttpHeaders(
    //       {
    //         Authorization: 'Bearer ' + token,
    //       })
    //   }).pipe(
    //     map(this.extractResponseData),
    //     catchError(this.handleError)
    //   );
  }
  /**
   * Making the api call for the get favorite movie endpoint
   * @param Username 
   * @returns an observable with a FavoriteMovies array
   */
  getFavoriteMovies(Username: string): Observable<any> {

    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + 'users/' + Username,
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        map((data) => data.FavoriteMovies),
        catchError(this.handleError)
      );

  }
  /**
   *  Making the api call for the add a movie to favourite Movies endpoint
   * @param MovieId 
   * @returns an observable with a user object
   */
  addFavoriteMovie(MovieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    user.FavoriteMovies.push(MovieId);
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.post(apiUrl + `users/${user.Username}/movies/${MovieId}`, {}, {
      headers: new HttpHeaders(
        {
          "Content-Type": "application/json",
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
   * 
   * @param MovieId 
   * @returns boolean value if user contains the movie in their FavoriteMovies
   */
  isFavoriteMovie(MovieId: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      return user.FavoriteMovies.includes(MovieId);

    }
    return false;
  }

  /**
   * Making the api call for the edit user endpoint
   * @param updatedUser 
   * @returns an observable with a user object
   */
  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + user.Username, updatedUser, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  /**
   * Making the api call for the delete user endpoint
   * @param Username 
   * @returns an observable with a user object
   */
  deleteUser(Username: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + Username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Making the api call for the delete a movie from the favorite movies endpoint
   * @param MovieId 
   * @returns an observable with a user object
   */
  deleteFavoriteMovie(MovieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const index = user.FavoriteMovies.indexOf(MovieId);
    if (index >= 0) {
      user.FavoriteMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));
    return this.http.delete(apiUrl + 'users/' + user.Username + '/movies/' + MovieId, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.log(error);
      console.log(error.error);
      console.error('Some error occurred:', error.error.message);
    } else {
      console.log(error);
      console.log(error.error);
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));

  }
}