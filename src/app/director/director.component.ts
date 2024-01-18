import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrl: './director.component.css'
})
export class DirectorComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public movies: {
      director: {
        name: string;
        bio: string;
        birth: number;
        movies: string;
      };
    }
  ) { }

  ngOnInit(): void {
  }
}