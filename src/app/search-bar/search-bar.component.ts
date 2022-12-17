import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  @Input() movies: any[];
  @Output() search = new EventEmitter();
  title: string;
  constructor() { }

  ngOnInit(): void {

  }
  searchMovie() {
    if (this.title !== '') {
      for (let movie of this.movies) {
        if (movie.title.toLocaleLowerCase().search(this.title.toLocaleLowerCase()) !== -1) {
          this.search.emit(this.title);
        }
      }
    } else {
      this.search.emit('');
    }
  }
}
