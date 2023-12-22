import { Component, OnInit, Input } from '@angular/core';

// Import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Import brings in the API calls 
import { FetchApiDataService } from '../fetch-api-data.service';

// Import is used to display notifications back to the user 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.css'
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Name: '', Username: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
   ) { }

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  /**
   * Functions for sending the form inputs to the backend to create a new user
   * @returns alert indicating a successful registration or an error 
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here! (To be implemented)
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result);
      this.snackBar.open('user registered successfully!', 'OK', {
        duration: 2000
      });
  
  // log user in and navigate to movies
  this.fetchApiData.userLogin(this.userData).subscribe((result) => {
    localStorage.setItem('user', JSON.stringify(result.user));
    localStorage.setItem('token', result.token);
  });

  }, (response) => {
    this.snackBar.open(response, 'OK', {
     duration: 2000
      });
   });
}

}
