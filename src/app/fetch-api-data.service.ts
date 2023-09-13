import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'signup', userDetails)
    .pipe(catchError(this.handleError));
  }
  //Making the api call for the user registration endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'login',userDetails)
    .pipe(catchError(this.handleError));
  }

  //Making the api call to get all the movies
    getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', 
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.bind),
      catchError(this.handleError)
    );
  }
  
  // Making the api call to get one movie endpoint
  getOneMovie(Title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + Title,  
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.bind),
      catchError(this.handleError)
    );
  }
  //Making the api call for the get one director endpoint
  getOneDirector(directorName: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName,  
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.bind),
      catchError(this.handleError)
    );
  }
  //Making the api call for the get one genre endpoint
  getOneGenre(genreName: string) :Observable<any>{
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres/' + genreName,  
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.bind),
      catchError(this.handleError)
    );
  }
  //Making the api call for the get one user endpoint
  getOneUser(): Observable<any> {
    const username = localStorage.getItem('Username');
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + 'users/' + username,  
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.bind),
      catchError(this.handleError)
    );
  }
  // making the api call for get favorite movies
  getFavoriteMovies() :Observable<any> {
    const username = localStorage.getItem('Username');
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + `users/${username}/movies`,  
    {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData.bind),
      catchError(this.handleError)
    );

  }
  // Making the api call for the add a movie to favourite Movies endpoint
addFavoriteMovie(MovieId: string): Observable<any> {
  const username = localStorage.getItem('Username');
  const token = localStorage.getItem('token');
  return this.http.post(apiUrl + 'users/' + username + '/movies/' + MovieId, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData.bind),
    catchError(this.handleError)
  );
}
// Making the api call for the edit user endpoint
editUser(updatedUser: any): Observable<any> {
  const username = localStorage.getItem('Username');
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + 'users/' + username, updatedUser, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData.bind),
    catchError(this.handleError)
  );
}
// Making the api call for the delete user endpoint
deleteUser(): Observable<any> {
  const username = localStorage.getItem('Username');
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + username, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData.bind),
    catchError(this.handleError)
  );
}

// Making the api call for deleting a movie from the favorite movies endpoint
deleteFavoriteMovie(MovieId: string): Observable<any> {
  const username = localStorage.getItem('Username');
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + 'users/' + username + '/movies/' + MovieId, {
    headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
  }).pipe(
    map(this.extractResponseData.bind),
    catchError(this.handleError)
  );
}

// Non-typed response extraction
  private extractResponseData(res: Response): any {
    const body = res;
    return body || { };
  }

private handleError(error: HttpErrorResponse): Observable <never> {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(() => new Error ('Something bad happened; please try again later.'));
   
  }
}