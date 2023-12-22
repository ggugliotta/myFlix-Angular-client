import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<MovieDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string; 
      imageUrl: string;
      description: string;
      genre: object; 
      director: object; 
      actors: string;
      featured: boolean;
      ReleaseYear: Date; 
      rating: string; 
    }
  ) { }
  ngOnInit(): void { }
  }