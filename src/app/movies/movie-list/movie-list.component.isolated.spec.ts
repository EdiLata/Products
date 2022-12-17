import {MovieListComponent} from './movie-list.component';
import {MovieService} from '../../services/movie.service';
import {CategoryService} from '../../services/category.service';

describe('MovieListComponent', () => {
    let component: MovieListComponent;
    let mockMovieService, mockCategoryService;

    beforeEach(() => {
        component = new MovieListComponent(mockMovieService, mockCategoryService);
    });

    describe('filterMovies', () => {
        it('should filter the movies correctly', () => {
            component.movieList = [{title: 'title1', category: 'Drama', description: 'd1', duration: 54, imageUrl: 'i1', trailerUrl: ''},
                {title: 'title2', category: 'Drama', description: 'd2', duration: 32, imageUrl: 'i2', trailerUrl: ''},
                {title: 'title3', category: 'Action', description: 'd1', duration: 11, imageUrl: 'i1', trailerUrl: ''}];

            component.filterMovies('Drama');

            expect(component.filteredMovies.length).toBe(2);
            expect(component.filteredMovies[0].title).toBe('title1');
            expect(component.filteredMovies[1].title).toBe('title2');
        });
    });
});
