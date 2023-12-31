import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }
  /**
   *  This is the function that will open the dialog when the signup button is clicked
   * @function openUserRegistrationDialog
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: "280px", // Assigning the dialog a width
      panelClass: "custom-dialog-class"
    });
  }
  /**
   * This is the function that will open the dialog when the Login button is clicked
   * @function openUserLoginDialog
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '300px', // Assigning the dialog a width
      panelClass: "custom-dialog-class"
    });
  }
  openMovieDialog(): void {
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  }
}
