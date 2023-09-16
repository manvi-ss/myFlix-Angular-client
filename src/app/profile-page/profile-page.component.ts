import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

type User = { _id?: string, Username?: string, Password?: string, Email?: string, FavoriteMovies?: [] }


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: User = {};

  @Input() userData = { Username: '', Password: '', Email: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    // public dialogRef: MatDialogRef<FetchApiDataService>,
    public router: Router
  ) { }
  ngOnInit(): void {
    const user = this.getUser();

    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }
    this.user = user;
    this.userData = {
      Username: user.Username || "",
      Email: user.Email || "",
      Password: ""
    }
  }
  getUser(): User {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      console.log(response)
      localStorage.setItem('user', JSON.stringify(response))
      this.user = response;
      this.snackBar.open('user updated!', 'OK', {
        duration: 2000
      })
    })
  }
  deleteUser(): void {
    this.fetchApiData.deleteUser(this.userData.Username).subscribe((response) => {
      console.log(response)
      this.user = response;
      this.snackBar.open('user deleted!', 'OK', {
        duration: 2000
      })
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['welcome']);
    },
      (error) => {
        console.error('Error deleting user:', error);
      })
  }
}
