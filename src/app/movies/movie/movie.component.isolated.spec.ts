import {MovieService} from '../../services/movie.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {MovieComponent} from './movie.component';

describe('MovieComponent', () => {
    let component: MovieComponent;
    let mockAngularFireStorage, mockMovieService;

    beforeEach(() => {
        component = new MovieComponent(mockAngularFireStorage, mockMovieService);
    });

    describe('onSubmit', () => {
        it('should not insert the movie if the form has required fields uncompleted', () => {

            component.onSubmit({title: '', category: '', description: '', duration: 36, imageUrl: 'i1', trailerUrl: ''});

            expect(component.formTemplate.valid).toBe(false);
            expect(component.formTemplate.value.title).toBe('');
        });
    });

    describe('resetForm', () => {
        it('should reset the form to an initial value', () => {
            component.resetForm();

            expect(component.formTemplate.value).toEqual({title: '', category: 'Action', description: '', duration: 0, imageUrl: '', trailerUrl: ''});
        });
    });
});
