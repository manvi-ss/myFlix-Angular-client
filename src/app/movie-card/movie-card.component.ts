import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[]=[];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router
  ) { }

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if(!user){
      this.router.navigate(['welcome']);
      return;
    }
    this.getMovies();
  }
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }
}
