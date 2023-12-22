// src/app/user-login-form/user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// Close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// Import display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.css'
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

constructor(
  public fetchApiData: FetchApiDataService,
  public dialogRef: MatDialogRef<UserLoginFormComponent>,
  public snackBar: MatSnackBar,
  private router: Router
) {}

ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend
loginUser(): void {
  console.log('Login');
  this.fetchApiData
    .userLogin(this.userData.Username, this.userData.Password)
    .subscribe(
      (result) => {
        console.log('result:', JSON.stringify(result));

        // Store username and token in local storage
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);

        this.dialogRef.close(); // This will close the modal on success!
        this.snackBar.open('user logged in', 'OK', {
          duration: 2000
        });

        this.router.navigate(['movies']);
      }, 
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000
        });
      }
    ); 

  }

}
