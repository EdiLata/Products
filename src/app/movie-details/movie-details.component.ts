import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MovieService} from '../services/movie.service';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
    name: string;
    movie: any;
    movieList: any[];

    constructor(private router: ActivatedRoute, private service: MovieService) {
    }

    ngOnInit(): void {
        this.name = this.router.snapshot.params['title'];
        this.service.getMovies().subscribe(movies => {
            this.movieList = movies;
            this.movieList.forEach(movie => {
                if (movie.title === this.name) {
                    this.movie = movie;
                }
            });
        });
    }

    undifindHandle(movie: any) {
        return typeof (movie) !== 'undefined';
    }
}
