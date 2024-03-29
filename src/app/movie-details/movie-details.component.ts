import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public movies: {
      description: string;
      actors: string; 
      releaseyear: Date; 
      rating: string
    }
  ) { }

  onNoClick(): void { }
}