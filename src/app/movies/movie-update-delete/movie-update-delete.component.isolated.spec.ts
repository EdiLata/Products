import {MovieService} from '../../services/movie.service';
import {MatLegacyDialog as MatDialog} from '@angular/material/legacy-dialog';
import {MovieUpdateDeleteComponent} from './movie-update-delete.component';

describe('MovieUpdateDeleteComponent', () => {
    let component: MovieUpdateDeleteComponent;
    let mockMovieService, mockMatDialog;

    beforeEach(() => {
        component = new MovieUpdateDeleteComponent(mockMatDialog, mockMovieService);
    });

    describe('filterSearch', () => {
        it('should search the movies correctly', () => {
            component.dataSource = [{title: 'title1', category: 'Drama', description: 'd1', duration: 11, imageUrl: 'i1', trailerUrl: ''},
                {title: 'title2', category: 'Drama', description: 'd2', duration: 32, imageUrl: 'i2', trailerUrl: ''},
                {title: 'title3', category: 'Action', description: 'd1', duration: 23, imageUrl: 'i1', trailerUrl: ''},
                {title: 'TITLE1', category: 'Action', description: 'd1', duration: 23, imageUrl: 'i1', trailerUrl: ''}];

            component.filterSearch('title1');

            expect(component.filteredMovies.length).toBe(2);
            expect(component.filteredMovies[0].title).toBe('title1');
            expect(component.filteredMovies[1].title).toBe('TITLE1');
        });
    });
});
